import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Handle GET request to fetch Notion tasks
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Optional: associate with a specific user if needed

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        // Query tasks from Notion database
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: 'Done', // Matches the property in your Notion database
                checkbox: {
                    equals: false, // Fetch tasks where "Done" is unchecked
                },
            },
            sorts: [
                {
                    property: 'Due Date', // Matches the property in your Notion database
                    direction: 'ascending', // Sort by due date ascending
                },
            ],
        });

        // Map tasks to a simplified format
        const tasks = response.results.map((task: any) => ({
            id: task.id,
            title: task.properties.Name?.title[0]?.text.content || 'Untitled',
            dueDate: task.properties['Due Date']?.date?.start || null,
        }));

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks from Notion:', error);
        return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
    }
}

// Handle POST request to add a new Notion task
export async function POST(request: Request) {
    const { title, dueDate, status, userId } = await request.json();

    // Log incoming data for debugging
    console.log('Incoming data:', { title, dueDate, status, userId });

    if (!title || !userId) {
        return NextResponse.json({ error: 'Title and User ID are required' }, { status: 400 });
    }

    try {
        // Example: Add a new task to Notion (requires specific Notion API endpoints)
        const newTask = await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID! },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: title,
                            },
                        },
                    ],
                },
                'Due Date': {
                    date: {
                        start: dueDate || null,
                    },
                },
                Status: {
                    select: {
                        name: status || 'Pending',
                    },
                },
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('Error adding task to Notion:', error);
        return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
    }
}
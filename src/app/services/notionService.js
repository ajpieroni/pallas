import { Client } from '@notionhq/client';

// Initialize the Notion client with the integration token
const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * Fetch tasks from the Notion database.
 * Filters tasks with "Done" unchecked, sorts by "Due Date," and groups by "Due Date."
 * @returns {Object} Grouped tasks by due date
 */
export const fetchNotionTasks = async () => {
    try {
        // Query the Notion database
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            filter: {
                property: 'Done', // Ensure this matches the property name in your Notion database
                checkbox: {
                    equals: false, // Only fetch tasks where "Done" is unchecked
                },
            },
            sorts: [
                {
                    property: 'Due Date', // Ensure this matches the property name in your Notion database
                    direction: 'ascending', // Sort tasks by due date in ascending order
                },
            ],
        });

        // Simplify the task data
        const tasks = response.results.map((task) => ({
            id: task.id,
            name: task.properties.Name?.title[0]?.text.content || 'Untitled', // Fetch task name
            dueDate: task.properties['Due Date']?.date?.start || null, // Fetch due date or set null
        }));

        // Group tasks by their due dates
        const groupedTasks = tasks.reduce((acc, task) => {
            const dateKey = task.dueDate || 'No Due Date';
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(task);
            return acc;
        }, {});

        return groupedTasks;
    } catch (error) {
        console.error('Error fetching tasks from Notion:', error);
        throw new Error('Failed to fetch tasks from Notion');
    }
};
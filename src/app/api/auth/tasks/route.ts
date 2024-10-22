// src/app/api/auth/tasks/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request to fetch tasks for a specific user
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const tasks = await prisma.task.findMany({
            where: { userId: parseInt(userId, 10) }, // Ensure userId is an integer
        });
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Failed to fetch tasks' }, { status: 500 });
    }
}

// Handle POST request to add a new task

export async function POST(request: Request) {
    const { title, status, priority, userId, effort } = await request.json();

    // Log the incoming data
    console.log('Incoming data:', { title, status, priority, userId, effort });

    if (!title || !userId || !effort) {
        return NextResponse.json({ error: 'Title, User ID, and Effort are required' }, { status: 400 });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                status,
                priority,
                userId,
                effort,
            },
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error adding task:", error);
        return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
    }
}
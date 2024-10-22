// src/app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const userId = req.headers.get('user-id'); // Extract user ID from headers or auth context
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: parseInt(userId) }, // Only fetch tasks for the logged-in user
  });
  
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, status, priority, effort, dueDate, userId } = body;

  const task = await prisma.task.create({
    data: {
      title,
      status,
      priority,
      effort,
      dueDate,
      userId,
    },
  });

  return NextResponse.json(task);
}

// Add other methods (PUT, DELETE) as needed...
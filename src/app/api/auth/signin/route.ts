import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !(await compare(password, user.password))) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Here, you would typically return a session token or something similar
    return NextResponse.json({ message: 'User signed in successfully', user });
}
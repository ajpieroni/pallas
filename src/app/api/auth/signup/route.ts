import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Validate the data
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ user }, { status: 201 }); // Return the created user
    } catch (error) {
        console.error("Error signing up user:", error); // Log the error
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
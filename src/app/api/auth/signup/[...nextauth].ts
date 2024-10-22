import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: Record<"email" | "password", string> | undefined) {
          // If credentials are missing, return null
          if (!credentials) {
            return null;
          }
  
          // Find the user in the database based on the provided email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          // If the user exists and the password matches, return the user object
          if (user && await compare(credentials.password, user.password)) {
            return {
              id: user.id.toString(), // Ensure the id is a string, since Prisma might use Int
              name: user.name,
              email: user.email,
            };
          }
  
          // If authentication fails, return null
          return null;
        },
      }),
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async jwt({ token, user }) {
        // Add user id to the JWT token if a user object exists
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Add user id to the session object
        if (token && session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  });
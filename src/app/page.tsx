"use client";
import Link from 'next/link';
import Layout from './components/Layout';
import { useTheme } from './contexts/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme(); // Access isDarkMode from the theme context

  return (
    <Layout>
      <div className={`flex flex-col items-center justify-center h-screen text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-4xl font-bold mb-4">Welcome to Pallas.</h1>
        <p className="text-lg mb-6">
          Your go-to dashboard for organizing tasks and maintaining focus.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Key Features:</h2>
          <ul className="list-disc list-inside text-left">
            <li className="mb-2">🗓️ Structure your week around your ideal schedule</li>
            <li className="mb-2">🎯 Align tasks with your personal goals</li>
            <li>⏰ Automatically schedule tasks for better productivity</li>
          </ul>
        </div>
        <div className="mt-6">
          <Link href="/auth/signin" className="text-blue-500">
            Sign In
          </Link>
        </div>
        <div className="mt-2">
          <Link href="/auth/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  );
}
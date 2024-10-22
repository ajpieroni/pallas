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
          Your minimalist dashboard for organizing tasks and staying focused.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Key Features:</h2>
          <ul className="list-disc list-inside text-left">
            <li className="mb-2">🗓️ Organize your activities based on your ideal week</li>
            <li className="mb-2">🎯 Connect your tasks to personal goals</li>
            <li>⏰ Auto-schedule tasks for optimal productivity</li>
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
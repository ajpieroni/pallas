// src/app/dashboard/page.tsx

"use client";

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';
export default function Dashboard() {
    const { isDarkMode } = useTheme();
    useEffect(() => {
        console.log('Dashboard mounted');
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-6 text-white font-serif">Dashboard</h1>
                <p className="text-lg text-gray-600 mb-8 font-serif">
                    Welcome to your minimalist dashboard! Here you can manage your tasks and stay organized.
                </p>
                
                {/* Tasks section */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Your Tasks</h2>
                    <ul className="list-disc pl-5">
                        <li className="text-gray-700 mb-2">Task 1</li>
                        <li className="text-gray-700 mb-2">Task 2</li>
                        <li className="text-gray-700 mb-2">Task 3</li>
                    </ul>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Add New Task
                    </button>
                </div>
                
                {/* Recent Activities section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Recent Activities</h2>
                    <p className="text-gray-700">No recent activities to display.</p>
                </div>
            </div>
        </Layout>
    );
}
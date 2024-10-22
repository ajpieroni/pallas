"use client";

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

export default function Dashboard() {
    const { isDarkMode } = useTheme();
    const { userId } = useUser(); // Get userId from context
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) {
                console.error("User ID is not available");
                return;
            }
            try {
                const response = await fetch(`/api/tasks?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    return (
        <Layout>
            <div className={`container mx-auto px-4 py-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <h1 className="text-4xl font-bold mb-6 font-serif">Dashboard</h1>
                {loading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <>
                        <p className="text-lg mb-8 font-serif">
                            Welcome to your minimalist dashboard! Here you can manage your tasks and stay organized.
                        </p>
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Your Tasks</h2>
                            {tasks.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {tasks.map(task => (
                                        <li key={task.id} className="text-gray-700 mb-2">
                                            <h3 className="font-bold">{task.title}</h3>
                                            <p>Status: {task.status}</p>
                                            <p>Priority: {task.priority}</p>
                                            <p>Effort: {task.effort}</p>
                                            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tasks available.</p>
                            )}
                            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Add New Task
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Recent Activities</h2>
                            <p className="text-gray-700">No recent activities to display.</p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
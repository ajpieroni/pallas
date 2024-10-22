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
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('Pending'); // Default status
    const [newTaskPriority, setNewTaskPriority] = useState('Medium'); // Default priority

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) {
                console.error("User ID is not available");
                return;
            }
            try {
                const response = await fetch(`/api/auth/tasks?userId=${userId}`, {
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

    const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Define your task data
        const taskData = {
            title: newTaskTitle,
            status: newTaskStatus,
            priority: newTaskPriority,
            userId, // Include userId from context
            effort: 'Medium', // You can change this as per your logic (e.g., input from the user)
        };
    

        console.log('Adding task:', taskData);
        console.log(JSON.stringify(taskData));

        try {
            const response = await fetch('/api/auth/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
    
            const newTask = await response.json();
            setTasks([...tasks, newTask]); // Update your tasks state with the new task

            console.log('Task added successfully:', newTask);
            // Reset input fields
            setNewTaskTitle('');
            setNewTaskStatus('Pending');
            setNewTaskPriority('Medium');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

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

                        {/* New Task Form */}
                        <form onSubmit={handleAddTask} className="mb-6 bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Add New Task</h2>
                            <input
                                type="text"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Task Title"
                                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                                required
                            />
                            <div className="mb-4">
                                <label htmlFor="status" className="block">Status:</label>
                                <select
                                    id="status"
                                    value={newTaskStatus}
                                    onChange={(e) => setNewTaskStatus(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="priority" className="block">Priority:</label>
                                <select
                                    id="priority"
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Add Task
                            </button>
                        </form>

                        {/* Tasks section */}
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
                        </div>

                        {/* Recent Activities section */}
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
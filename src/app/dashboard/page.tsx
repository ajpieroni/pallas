"use client";

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

interface Task {
    id: number;
    title: string;
    status: string; // 'Pending', 'In Progress', or 'Completed'
    priority: string; // 'Low', 'Medium', or 'High'
    effort: string; // You might also want to specify possible values here
    dueDate?: string; // Optional, assuming it can be null
    userId: number;
}

export default function Dashboard() {
    const { isDarkMode } = useTheme();
    const { userId } = useUser();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('Pending');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');

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

        const taskData = {
            title: newTaskTitle,
            status: newTaskStatus,
            priority: newTaskPriority,
            userId,
            effort: 'Medium',
            dueDate: undefined,
        };

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
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskStatus('Pending');
            setNewTaskPriority('Medium');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: Partial<Task>) => {
        try {
            const response = await fetch(`/api/auth/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const updatedTasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`/api/auth/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
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

                        {/* Tasks section as a table */}
                        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Your Tasks</h2>
                            {tasks.length > 0 ? (
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="py-2 text-left">Title</th>
                                            <th className="py-2 text-left">Status</th>
                                            <th className="py-2 text-left">Priority</th>
                                            <th className="py-2 text-left">Effort</th>
                                            <th className="py-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map(task => (
                                            <tr key={task.id}>
                                                <td className="border-b py-2">{task.title}</td>
                                                <td className="border-b py-2">
                                                    <select
                                                        value={task.status}
                                                        onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                                                        className="border border-gray-300 rounded-md p-1"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                </td>
                                                <td className="border-b py-2">
                                                    <select
                                                        value={task.priority}
                                                        onChange={(e) => handleUpdateTask(task.id, { priority: e.target.value })}
                                                        className="border border-gray-300 rounded-md p-1"
                                                    >
                                                        <option value="Low">Low</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="High">High</option>
                                                    </select>
                                                </td>
                                                <td className="border-b py-2">{task.effort}</td>
                                                <td className="border-b py-2">
                                                    <button
                                                        onClick={() => handleDeleteTask(task.id)}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No tasks available.</p>
                            )}
                        </div>

                        {/* Recent Activities section */}
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-black">Recent Activities</h2>
                            <p className="text-gray-700">No recent activities to display.</p>
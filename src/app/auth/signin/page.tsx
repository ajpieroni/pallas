"use client"; // Ensure this is at the top

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure you're using the correct import

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Create an instance of the router

    const onSubmit = async (data: SignInFormData) => {
        setLoading(true); // Set loading to true
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Sign-in failed'); // Use server's error message
            }

            const result = await response.json();
            console.log('User signed in successfully:', result);

            // Redirect to the dashboard after successful sign-in
            router.push('/dashboard'); // Redirect here
          } catch (error) {
            // Check if the error is an instance of Error
            if (error instanceof Error) {
                setErrorMessage(error.message || "Sign-in failed. Please try again.");
            } else {
                setErrorMessage("Sign-in failed. Please try again."); // Fallback message for unknown errors
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex justify-center items-center h-screen text-black">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading} // Disable button while loading
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    {loading ? 'Signing In...' : 'Sign In'} {/* Show loading text */}
                </button>
            </form>
        </div>
    );
}
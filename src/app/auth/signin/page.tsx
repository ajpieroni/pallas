// src/app/auth/signin/page.tsx

"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/contexts/UserContext';

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const { setUserId, setUserData } = useUser();

    const onSubmit = async (data: SignInFormData) => {
      try {
          const response = await fetch('/api/auth/signin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
  
          if (!response.ok) {
              throw new Error('Sign-in failed');
          }
  
          const result = await response.json();
          console.log('User signed in successfully:', result);
  
          // Assuming the response contains user ID and data
          setUserId(result.user.id); // Store user ID in context
          setUserData(result.user); // Store user data in context
  
          // Log user ID to check if it was set correctly
          console.log('User ID set in context:', result.user.id);
          
          // Redirect to the dashboard after successful sign-in
          router.push('/dashboard');
      } catch (error) {
          setErrorMessage("Sign-in failed. Please try again.");
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
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
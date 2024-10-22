import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
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
  );
}
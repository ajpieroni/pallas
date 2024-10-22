import Link from 'next/link';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Pallas.</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your minimalist dashboard for organizing tasks and staying focused.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Key Features:</h2>
          <ul className="list-disc list-inside text-left text-gray-600">
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
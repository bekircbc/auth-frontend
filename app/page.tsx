import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md text-center space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to Enterprise Auth
        </h1>
        <p className="text-gray-500">
          Secure, stateless JWT architecture backed by distributed Redis sessions.
        </p>
        <div className="flex flex-col space-y-3 pt-4">
          <Link 
            href="/login" 
            className="w-full py-3 bg-white hover:bg-blue-700 text-gray-700 hover:text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Sign In (Login)
          </Link>
          <Link 
            href="/register" 
            className="w-full py-3 bg-white hover:bg-blue-700 text-gray-700 hover:text-white font-medium rounded-lg transition-colors border border-gray-300"
          >
            Create an Account (Register)
          </Link>
        </div>
      </div>
    </div>
  );
}
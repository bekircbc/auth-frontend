'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardData {
  user_id: number;
  role: string;
  team_size: number;
  completed_tasks: number;
  performance_score: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized access');
        return res.json() as Promise<DashboardData>;
      })
      .then((dashboardData) => setData(dashboardData))
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async (): Promise<void> => {
    await fetch('http://localhost:8000/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Verifying secure session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Management Dashboard</h1>
            <p className="text-sm text-green-600 font-medium">✓ Connection Status: Secure (JWT & Redis Session)</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition duration-150 shadow-sm"
          >
            Revoke Session & Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Profile Data (PostgreSQL)</h3>
            <p className="text-gray-600 mb-2"><strong>User ID:</strong> {data.user_id}</p>
            <p className="text-gray-600"><strong>Role:</strong> <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{data.role}</span></p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Live Metrics</h3>
            <p className="text-gray-600 mb-2"><strong>Team Size:</strong> {data.team_size} members</p>
            <p className="text-gray-600 mb-2"><strong>Completed Tasks:</strong> {data.completed_tasks}</p>
            <p className="text-gray-600"><strong>Performance Score:</strong> %{data.performance_score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
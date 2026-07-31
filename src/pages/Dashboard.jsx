import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Employees', count: '100+', color: 'bg-blue-500' },
    { title: 'Active Products', count: '30', color: 'bg-emerald-500' },
    { title: 'System Status', count: 'Online', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Hello, {user?.firstName}! 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here is a quick overview of your workspace today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white font-bold text-lg`}>
              #
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
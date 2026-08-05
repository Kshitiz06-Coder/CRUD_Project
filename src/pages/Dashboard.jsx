import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Total Employees', 
      count: '100+', 
      light: 'bg-indigo-50 text-indigo-600',
      icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    { 
      title: 'Active Products', 
      count: '30', 
      light: 'bg-emerald-50 text-emerald-600',
      icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    },
    { 
      title: 'System Status', 
      count: 'Online', 
      light: 'bg-violet-50 text-violet-600',
      icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">Hello, {user?.firstName}! 👋</h2>
          <p className="mt-1 text-indigo-100">Here is a quick overview of your workspace today.</p>
        </div>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-20 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.light} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{stat.count}</p>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${stat.light.split(' ')[0].replace('bg-', 'bg-').replace('50', '500')} rounded-full w-3/4`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
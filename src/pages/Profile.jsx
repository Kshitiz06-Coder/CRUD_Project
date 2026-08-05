import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
        <img
          src={user?.image || 'https://via.placeholder.com/80'}
          alt="Avatar"
          className="w-20 h-20 rounded-full bg-gray-100 border"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user?.firstName} {user?.lastName}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full capitalize">
            {user?.gender || 'User'}
          </span>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Settings</h3>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-gray-700">Email Notifications</p>
            <p className="text-xs text-gray-500">Receive system updates and activity logs</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Outlet, Link } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-5">
                <h2 className="text-xl font-bold mb-5">Dashboard</h2>
                <nav>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/dashboard/home" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/profile" className="text-blue-600 hover:underline">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/settings" className="text-blue-600 hover:underline">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
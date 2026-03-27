'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/redux/api/authApi';
import { logout } from '@/redux/features/authSlice';
import Dropdown from './UserDropdown';
import BrandLogo from '@/components/reusable/BrandLogo';

const Header = () => {
    const [logoutMutation] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        await logoutMutation({});
        logout();
        router.push('/login');
    };

    return (
        <header className="py-4 px-6 rounded-xl text-gray-800 bg-white sticky top-0 left-0 right-0 z-30 shadow-lg border border-gray-100 mb-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    {/* Logo for larger screens */}
                    <div className="hidden lg:block">
                        <BrandLogo href="/dashboard" subtitle="Admin Panel" />
                    </div>

                    {/* Brand name for mobile/tablet when sidebar is hidden */}
                    <div className="lg:hidden ml-12">
                        <BrandLogo href="/dashboard" subtitle="Admin Panel" className="scale-95" />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center text-sm text-gray-600">
                        <span className="font-medium">Admin Dashboard</span>
                    </div>
                    <Dropdown handleLogout={handleLogout} />
                </div>
            </div>
        </header>
    );
};

export default Header;

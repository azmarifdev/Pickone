'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CustomLink from '../../reusable/CustomLink/CustomLink';
import { MdCategory, MdDashboard, MdReviews, MdMenu, MdClose } from 'react-icons/md';
import { TbLogout, TbMenuOrder } from 'react-icons/tb';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import SmallCustomLink from '@/components/reusable/CustomLink/SmallCustomLink';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SiProducthunt } from 'react-icons/si';
import { useLogoutMutation } from '@/redux/api/authApi';
import { logout } from '@/redux/features/authSlice';
import BrandLogo from '@/components/reusable/BrandLogo';

const Sidebar = () => {
    const pathname = usePathname();
    const [logoutMutation] = useLogoutMutation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const router = useRouter();

    // Check if mobile on mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setIsCollapsed(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Keyboard shortcut for sidebar toggle (Ctrl/Cmd + B)
        const handleKeyboardShortcut = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                if (!isMobile) {
                    setIsCollapsed(!isCollapsed);
                }
            }
        };

        window.addEventListener('keydown', handleKeyboardShortcut);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('keydown', handleKeyboardShortcut);
        };
    }, [isCollapsed, isMobile]);

    const handleLogout = async () => {
        await logoutMutation({}).unwrap();
        logout();
        router.push('/login');
    };

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <>
            {/* Mobile Menu Button */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors">
                    {isMobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
            )}

            {/* Mobile Overlay */}
            {isMobile && isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:sticky lg:top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden overflow-y-auto scrollbar-overlay shadow-2xl transition-all duration-300 z-40 ${
                    isMobile
                        ? `${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} w-[280px]`
                        : `${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`
                }`}>
                {/* Collapse Button for Desktop */}
                {!isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-6 right-4 z-10 p-2 bg-slate-700/50 hover:bg-slate-600 text-slate-200 rounded-lg transition-all duration-200 hover:scale-110">
                        {isCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
                    </button>
                )}

                <div className={`px-6 ${isCollapsed && !isMobile ? 'px-4' : 'px-6'}`}>
                    {/* Logo Section */}
                    <div
                        className={`flex items-center mb-8 justify-center border-b border-slate-700 pb-6 pt-6 ${
                            isCollapsed && !isMobile ? 'px-2' : ''
                        }`}>
                        {isCollapsed && !isMobile ? (
                            <BrandLogo compact href="/dashboard" variant="light" />
                        ) : (
                            <BrandLogo href="/dashboard" subtitle="Admin Panel" variant="light" />
                        )}
                    </div>

                    {/* Navigation */}
                    <Accordion type="multiple" defaultValue={['item-1']} className="space-y-2">
                        <CustomLink
                            href="/dashboard"
                            icon={MdDashboard}
                            label="Dashboard"
                            isCollapsed={isCollapsed && !isMobile}
                        />
                        <CustomLink
                            href="/category"
                            icon={MdCategory}
                            label="Category"
                            isCollapsed={isCollapsed && !isMobile}
                        />

                        {/* Products Accordion */}
                        {isCollapsed && !isMobile ? (
                            <div className="group relative">
                                <div
                                    className={`w-full py-3 mb-2 text-base font-medium px-4 hover:bg-slate-700/50 rounded-lg transition-all duration-200 cursor-pointer ${
                                        pathname.startsWith('/product/') ? 'text-blue-400 bg-slate-700/50' : 'text-slate-200'
                                    }`}>
                                    <div className="flex items-center justify-center">
                                        <SiProducthunt
                                            size={20}
                                            color={pathname.startsWith('/product/') ? '#60a5fa' : '#e2e8f0'}
                                        />
                                    </div>
                                </div>

                                {/* Tooltip for collapsed state */}
                                <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-600">
                                    Products
                                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600 rotate-45"></div>
                                </div>
                            </div>
                        ) : (
                            <AccordionItem value="item-1" className="border-none">
                                <AccordionTrigger
                                    className={`w-full py-3 mb-2 text-base !font-medium px-4 hover:bg-slate-700/50 rounded-lg !no-underline transition-all duration-200 ${
                                        pathname.startsWith('/product/') ? 'text-blue-400 bg-slate-700/50' : 'text-slate-200'
                                    }`}>
                                    <div className="flex items-center w-full">
                                        <span className="mr-3">
                                            <SiProducthunt
                                                size={20}
                                                color={pathname.startsWith('/product/') ? '#60a5fa' : '#e2e8f0'}
                                            />
                                        </span>
                                        Products
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-2">
                                    <div className="ml-4 space-y-1">
                                        <SmallCustomLink href="/product/manage-product" label="Manage Product" />
                                        <SmallCustomLink href="/product/add-product" label="Add Product" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )}

                        <CustomLink
                            href="/orders"
                            icon={TbMenuOrder}
                            label="Orders"
                            isCollapsed={isCollapsed && !isMobile}
                        />
                        <CustomLink
                            href="/reviews"
                            icon={MdReviews}
                            label="Reviews"
                            isCollapsed={isCollapsed && !isMobile}
                        />
                    </Accordion>

                    {/* Logout Button */}
                    <div className={`absolute bottom-6 left-6 right-6 ${isCollapsed && !isMobile ? 'left-4 right-4' : ''}`}>
                        {isCollapsed && !isMobile ? (
                            <div className="group relative">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg">
                                    <TbLogout size={20} />
                                </button>

                                {/* Tooltip for collapsed logout */}
                                <div className="absolute left-full bottom-0 ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-600">
                                    Logout
                                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-600 rotate-45"></div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <TbLogout size={20} />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

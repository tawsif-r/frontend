'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-gray-900 shadow-lg z-50 transition-all duration-300 ease-in-out ${
                isVisible ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col h-full">
                {/* Header/Logo Section */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    {isVisible && (
                        <h2 className="text-xl font-bold text-white transition-opacity overflow-hidden duration-200">
                            Admin
                        </h2>
                    )}
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-6">
                    <ul className="space-y-2 px-2">
                        <li>
                            <Link
                                href="/admin/dashboard/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Home</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/about/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">About</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/contact/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Contact</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/products/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v6l-8 4m8-10l-8 4m0 0L4 13V7" />
                                </svg>
                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Products</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Navbar;
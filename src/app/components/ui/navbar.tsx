'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-gray-950 bg-opacity-90 shadow-lg z-50 transition-all duration-300 ease-in-out ${isVisible ? 'w-64' : 'w-16'
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
                                {/* <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v6l-8 4m8-10l-8 4m0 0L4 13V7" />
                                </svg> */}
                                <svg className="w-5 h-5 mr-3 flex-shrink-0 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>

                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Products</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/features/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Features</span>}
                            </Link>
                            <Link
                                href="/admin/settings/"
                                className={`flex items-center px-4 py-3 text-gray-300 font-medium rounded-lg 
                                    hover:text-white hover:bg-gray-800 transition-all duration-200 ease-in-out 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                            >
                                <svg className="w-5 h-5 mr-3 flex-shrink-0 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                {isVisible && <span className="transition-opacity duration-200 overflow-hidden">Settings</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Navbar;
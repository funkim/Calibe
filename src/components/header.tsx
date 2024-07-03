'use client'
import Link from 'next/link'
import { useState } from 'react'
import CartPopup from './cartPopup'

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm">
            <nav className="mx-auto px-4 font-brand sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center text-xl">
                        Calibe
                    </Link>
                    <div className="hidden items-center space-x-4 sm:flex">
                        {['men', 'women', 'accessories'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item}`}
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-gray-900 hover:border-gray-300"
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:text-gray-500"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <span className="sr-only">View Profile</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:text-gray-500"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <span className="sr-only">View Cart</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <CartPopup
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    )
}

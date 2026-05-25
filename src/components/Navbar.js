'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { totalItems } = useCart()

    return (
        <nav className="bg-[#131921] text-white sticky top-0 z-50">

            {/* Top bar */}
            <div className="flex items-center gap-4 px-4 py-2 max-w-[1500px] mx-auto">

                {/* Logo */}
                <Link href="/">
                    <div className="flex border-2 border-transparent hover:border-white px-2 py-1">
                        <span className="text-2xl font-bold text-white italic">amazon</span>
                        <span className="text-yellow-400 text-xs block text-right">.in</span>
                    </div>
                </Link>

                {/* Search bar */}
                <div className="flex flex-1 h-10">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-1 px-4 text-black text-sm outline-none rounded-l-md"
                    />
                    <button className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">

                    {/* Account */}
                    {user ? (
                        <div className="border-2 border-transparent hover:border-white px-2 py-1 cursor-pointer">
                            <p className="text-xs text-gray-300">Hello, {user.name}</p>
                            <button
                                onClick={logout}
                                className="text-sm font-bold hover:text-yellow-400"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <div className="border-2 border-transparent hover:border-white px-2 py-1">
                                <p className="text-xs text-gray-300">Hello, Sign in</p>
                                <p className="text-sm font-bold">Account & Lists</p>
                            </div>
                        </Link>
                    )}

                    {/* Orders */}
                    <Link href="/orders">
                        <div className="border-2 border-transparent hover:border-white px-2 py-1">
                            <p className="text-xs text-gray-300">Returns</p>
                            <p className="text-sm font-bold">& Orders</p>
                        </div>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <div className="flex items-end border-2 border-transparent hover:border-white px-2 py-1">
                            <div className="relative">
                                <span className="absolute -top-1 left-3 text-yellow-400 font-bold text-sm">
                                    {totalItems}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold">Cart</span>
                        </div>
                    </Link>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#232f3e] flex items-center gap-4 px-4 py-2 text-sm">
                <button className="flex items-center gap-1 hover:text-yellow-400 font-bold">
                    ☰ All
                </button>
                <Link href="/?category=Electronics" className="hover:text-yellow-400 whitespace-nowrap">Electronics</Link>
                <Link href="/?category=Clothing" className="hover:text-yellow-400">Clothing</Link>
                <Link href="/?category=Kitchen" className="hover:text-yellow-400">Kitchen</Link>
                <Link href="/?category=Footwear" className="hover:text-yellow-400">Footwear</Link>
                <Link href="/" className="hover:text-yellow-400 whitespace-nowrap">Today's Deals</Link>
                <Link href="/" className="hover:text-yellow-400 whitespace-nowrap">Customer Service</Link>
            </div>

        </nav>
    )
}
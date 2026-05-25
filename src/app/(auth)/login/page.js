'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(email, password)

        if (!result.success) {
            setError(result.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8">

            {/* Logo */}
            <Link href="/">
                <h1 className="text-3xl font-bold italic mb-6">amazon</h1>
            </Link>

            {/* Form box */}
            <div className="border border-gray-300 rounded-md p-6 w-full max-w-sm">
                <h2 className="text-2xl font-medium mb-4">Sign in</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm font-bold block mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold block mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>

                </form>

                <p className="text-xs text-gray-500 mt-4">
                    By signing in you agree to our terms and conditions.
                </p>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <p className="text-sm">
                        New to Amazon?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Create your account
                        </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}
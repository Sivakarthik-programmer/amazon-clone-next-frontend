'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters')
        }

        setLoading(true)
        const result = await register(name, email, password)

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
                <h2 className="text-2xl font-medium mb-4">Create account</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="text-sm font-bold block mb-1">Your name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            required
                        />
                    </div>

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

                    <div>
                        <label className="text-sm font-bold block mb-1">Re-enter password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create your Amazon account'}
                    </button>

                </form>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import axiosInstance from '../../lib/axios'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) { router.push('/login'); return }
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get('/api/orders')
                setOrders(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [user])

    if (isLoading) return <div className="flex justify-center items-center h-96"><p>Loading...</p></div>

    return (
        <div className="max-w-[1500px] mx-auto p-4">
            <h1 className="text-3xl font-medium mb-6">Your Orders</h1>
            {orders.length === 0 ? (
                <div className="bg-white p-8 rounded-md text-center">
                    <p className="text-xl mb-4">No orders yet</p>
                    <a href="/" className="text-blue-600 hover:underline">Continue Shopping</a>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-4 rounded-md">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                                <div>
                                    <p className="text-sm text-gray-500">ORDER PLACED</p>
                                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">TOTAL</p>
                                    <p className="text-sm font-bold">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">STATUS</p>
                                    <p className="text-sm font-bold text-green-600">{order.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ORDER ID</p>
                                    <p className="text-sm">{order._id}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-2 border-t text-sm text-gray-600">
                                <p>Shipping to: {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
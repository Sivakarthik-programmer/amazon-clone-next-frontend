'use client'

import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import axiosInstance from '../../lib/axios'

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart()
    const { user } = useAuth()
    const router = useRouter()

    const [address, setAddress] = useState({
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePayment = async () => {
        // Validate address
        if (!address.address || !address.city || !address.state ||
            !address.pincode || !address.phone) {
            setError('Please fill all address fields')
            return
        }
        console.log('Razorpay key:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID)
        console.log('Cart items:', cartItems)
        console.log('Total:', totalPrice)
        setLoading(true)
        setError('')

        try {
            // Step 1 — Create Razorpay order from backend
            const { data: order } = await axiosInstance.post('/api/payment/create-order', {
                amount: totalPrice
            })

            // Step 2 — Open Razorpay payment modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: 'INR',
                name: 'Amazon Clone',
                description: 'Order Payment',
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // Step 3 — Verify payment
                        const { data: verification } = await axiosInstance.post(
                            '/api/payment/verify', response
                        )

                        if (verification.success) {
                            // Step 4 — Create order in DB
                            await axiosInstance.post('/api/orders', {
                                items: cartItems.map(item => ({
                                    product: item._id,
                                    name: item.name,
                                    image: item.image,
                                    price: item.price,
                                    quantity: item.quantity
                                })),
                                shippingAddress: address,
                                totalPrice,
                                paymentResult: response
                            })

                            // Step 5 — Clear cart and redirect
                            clearCart()
                            router.push('/orders')
                        }
                    } catch (error) {
                        setError('Payment verification failed')
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: address.phone
                },
                theme: {
                    color: '#f0c14b'
                }
            }

            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } catch (error) {
            setError(error.response?.data?.message || 'Payment failed')
        }

        setLoading(false)
    }

    return (
        <div className="max-w-[1500px] mx-auto p-4">
            <h1 className="text-3xl font-medium mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Shipping Address */}
                <div className="lg:col-span-2 bg-white p-6 rounded-md">
                    <h2 className="text-xl font-medium mb-4">Shipping Address</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold block mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={address.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500"
                                placeholder="Street address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold block mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold block mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold block mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={address.pincode}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold block mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-yellow-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-md h-fit">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                    {/* Items */}
                    <div className="flex flex-col gap-2 mb-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex justify-between text-sm">
                                <span>{item.name} x{item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>

                    <hr className="my-2" />

                    <div className="flex justify-between text-green-600 text-sm mb-2">
                        <span>Delivery</span>
                        <span>FREE</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total</span>
                        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading || cartItems.length === 0}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full font-medium disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : `Pay ₹${totalPrice.toLocaleString('en-IN')}`}
                    </button>
                </div>

            </div>
        </div>
    )
}
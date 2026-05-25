'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
    const { user } = useAuth()
    const router = useRouter()

    const handleCheckout = () => {
        if (!user) {
            router.push('/login')
            return
        }
        router.push('/checkout')
    }

    if (cartItems.length === 0) return (
        <div className="max-w-[1500px] mx-auto p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <Link href="/" className="text-blue-600 hover:underline">
                Continue Shopping
            </Link>
        </div>
    )

    return (
        <div className="max-w-[1500px] mx-auto p-4">
            <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                {/* Cart Items */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded-md flex gap-4">

                            {/* Image */}
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <Link href={`/products/${item._id}`}>
                                    <h3 className="font-medium hover:text-orange-500">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-green-600 text-sm mt-1">In Stock</p>
                                <p className="text-lg font-bold mt-1">
                                    ₹{item.price.toLocaleString('en-IN')}
                                </p>

                                {/* Quantity + Remove */}
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 border-x border-gray-300">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-lg"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Item total */}
                            <div className="text-right">
                                <p className="font-bold">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white p-4 rounded-md h-fit">
                    <h2 className="text-lg font-medium mb-4">
                        Order Summary
                    </h2>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm">
                            Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)
                        </span>
                        <span className="font-bold">
                            ₹{totalPrice.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <div className="flex justify-between mb-2 text-green-600">
                        <span className="text-sm">Delivery</span>
                        <span className="text-sm font-bold">FREE</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">Order Total</span>
                        <span className="font-bold text-lg">
                            ₹{totalPrice.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full text-sm font-medium"
                    >
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    )
}
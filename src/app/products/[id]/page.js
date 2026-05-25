'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import axiosInstance from '../../../lib/axios'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [added, setAdded] = useState(false)
    const { addToCart } = useCart()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/products/${id}`)
                setProduct(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (isLoading) return (
        <div className="flex justify-center items-center h-96">
            <p className="text-xl">Loading...</p>
        </div>
    )

    if (!product) return (
        <div className="flex justify-center items-center h-96">
            <p className="text-xl">Product not found</p>
        </div>
    )

    return (
        <div className="max-w-[1500px] mx-auto p-4 bg-white mt-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Product Image */}
                <div className="relative h-96">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-medium">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-lg">
                            {'★'.repeat(Math.round(product.rating))}
                        </span>
                        <span className="text-blue-600 text-sm">
                            {product.numReviews} ratings
                        </span>
                    </div>

                    <hr />

                    {/* Price */}
                    <div>
                        <span className="text-sm">M.R.P: </span>
                        <span className="text-2xl font-medium">
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <hr />

                    {/* Description */}
                    <div>
                        <h3 className="font-bold mb-2">About this item</h3>
                        <p className="text-sm text-gray-700">{product.description}</p>
                    </div>

                    {/* Category */}
                    <p className="text-sm">
                        <span className="font-bold">Category: </span>
                        {product.category}
                    </p>

                    {/* Stock */}
                    <p className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                    </p>
                </div>

                {/* Buy box */}
                <div className="border border-gray-300 rounded-md p-4 h-fit flex flex-col gap-3">
                    <p className="text-2xl font-medium">
                        ₹{product.price.toLocaleString('en-IN')}
                    </p>

                    <p className="text-sm text-green-600 font-bold">FREE Delivery</p>

                    <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full text-sm font-medium disabled:opacity-50"
                    >
                        {added ? '✓ Added to Cart!' : 'Add to Cart'}
                    </button>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded-full text-sm font-medium disabled:opacity-50"
                    >
                        Buy Now
                    </button>
                </div>

            </div>
        </div>
    )
}
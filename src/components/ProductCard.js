'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()

    return (
        <div className="bg-white p-4 rounded-md hover:shadow-lg transition-shadow duration-200 flex flex-col">

            {/* Product Image */}
            <Link href={`/products/${product._id}`}>
                <div className="relative h-48 mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1">
                <Link href={`/products/${product._id}`}>
                    <h3 className="text-sm font-medium hover:text-orange-500 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
                    <span className="text-sm text-gray-500">({product.numReviews})</span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold mt-1">
                    ₹{product.price.toLocaleString('en-IN')}
                </p>

                {/* Stock */}
                {product.stock < 10 && (
                    <p className="text-red-500 text-sm">Only {product.stock} left!</p>
                )}
            </div>

            {/* Add to Cart */}
            <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-full transition-colors"
            >
                Add to Cart
            </button>

        </div>
    )
}
'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '../lib/axios'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get('/api/products')
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) return (
    <div className="flex justify-center items-center h-96">
      <p className="text-xl">Loading...</p>
    </div>
  )

  return (
    <main className="max-w-[1500px] mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  )
}
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    // Load cart from localStorage on app start
    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    // Add to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item._id === product._id)
            if (exists) {
                // increase quantity if already in cart
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    // Remove from cart
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id))
    }

    // Update quantity
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeFromCart(id)
        setCartItems(prev =>
            prev.map(item =>
                item._id === id ? { ...item, quantity } : item
            )
        )
    }

    // Clear cart
    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('cart')
    }

    // Total price
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )

    // Total items
    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity, 0
    )

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalPrice,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    )
}

// Custom hook
export function useCart() {
    return useContext(CartContext)
}
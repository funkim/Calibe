'use client'
import React, { createContext, useState, useContext, useCallback } from 'react'
import { Product } from './cartButton'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addItemToCart: (item: Product) => void
    removeFromCart: (item: Product) => void
    clearCart: () => void
    cartTotal: (items?: CartItem[]) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addItemToCart = useCallback((item: Product) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id
            )
            if (existingItemIndex >= 0) {
                return prevItems.map((cartItem, index) =>
                    index === existingItemIndex
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            } else {
                return [...prevItems, { ...item, quantity: 1 }]
            }
        })
    }, [])

    const removeFromCart = useCallback(
        (item: Product) => {
            setCartItems((prevItems) => {
                const existingItemIndex = prevItems.findIndex(
                    (i) => i.id === item.id
                )
                if (existingItemIndex >= 0) {
                    const updatedItems = prevItems.map((cartItem, index) =>
                        index === existingItemIndex && cartItem.quantity >= 1
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    )
                    return updatedItems.filter((item) => item.quantity > 0)
                }
                return prevItems
            })
        },
        [cartItems]
    )

    const clearCart = useCallback(() => {
        setCartItems([])
    }, [])

    const cartTotal = useCallback(
        (items: CartItem[] = cartItems): number => {
            return items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            )
        },
        [cartItems]
    )

    const contextValue: CartContextType = {
        cartItems,
        addItemToCart,
        removeFromCart,
        clearCart,
        cartTotal,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

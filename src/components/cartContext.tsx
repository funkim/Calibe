'use client'
import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [totalItemCount, setTotalItemCount] = useState(0)

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id
            )
            if (existingItemIndex >= 0) {
                const newItems = [...prevItems]
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1,
                }
                return newItems
            } else {
                return [...prevItems, { ...item, quantity: 1 }]
            }
        })
        setTotalItemCount((prevCount) => prevCount + 1)
    }

    const removeFromCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id
            )
            if (existingItemIndex >= 0) {
                const newItems = [...prevItems]
                if (newItems[existingItemIndex].quantity > 1) {
                    newItems[existingItemIndex] = {
                        ...newItems[existingItemIndex],
                        quantity: newItems[existingItemIndex].quantity - 1,
                    }
                } else {
                    newItems.splice(existingItemIndex, 1)
                }
                return newItems
            }
            return prevItems
        })
        setTotalItemCount((prevCount) => Math.max(0, prevCount - 1))
    }
    const clearCart = () => {
        console.log(cartItems)
        setCartItems([])
        setTotalItemCount(0)
    }

    function cartTotal(cartItems) {
        const total = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
        return total
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addItemToCart,
                removeFromCart,
                totalItemCount,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

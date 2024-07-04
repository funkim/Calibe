'use client'
import { useContext } from 'react'
import { CartContext } from '@/components/cartContext'

export function AddToCartButton({ product }) {
    const { addItemToCart } = useContext(CartContext)

    return (
        <button
            onClick={() => addItemToCart(product)}
            className="rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
            Add to Cart
        </button>
    )
}

export function RemoveFromCartButton({ product }) {
    const { removeFromCart } = useContext(CartContext)

    return (
        <button
            className="mx-3 font-body"
            onClick={() => removeFromCart(product)}
        >
            X
        </button>
    )
}

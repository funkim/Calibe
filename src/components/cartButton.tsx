'use client'
import { useContext } from 'react'
import { useCart } from '@/components/cartContext'
export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export function AddToCartButton({ product }: { product: Product }) {
    const { addItemToCart } = useCart()

    return (
        <button
            onClick={() => addItemToCart(product)}
            className="rounded-md bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
            Add to Cart
        </button>
    )
}

export function RemoveFromCartButton({ product }: { product: Product }) {
    const { removeFromCart } = useCart()

    return (
        <button
            className="mx-3 font-body"
            onClick={() => removeFromCart(product)}
        >
            X
        </button>
    )
}

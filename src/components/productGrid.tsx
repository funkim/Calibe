'use client'
import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Link from 'next/link'

export async function fetchStoreItems() {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()

        const filteredItems = data.filter(
            (item) =>
                item.category === "men's clothing" ||
                item.category === 'jewelery' ||
                item.category === "women's clothing"
        )

        const menItems = data.filter(
            (item) => item.category === "men's clothing"
        )

        const womenItems = data.filter(
            (item) => item.category === "women's clothing"
        )

        const jeweleryItems = data.filter(
            (item) => item.category === 'jewelery'
        )

        const itemlist = [filteredItems, menItems, womenItems, jeweleryItems]

        return itemlist
    } catch (error) {
        console.error('Error fetching store items:', error)
        return []
    }
}

export function ProductCard({ item }) {
    return (
        <Link href={`/product/${item.id}`}>
            <div className="flex h-full flex-col justify-between rounded-lg p-4">
                <div className="flex h-48 items-center justify-center overflow-hidden">
                    <LazyLoadImage
                        src={item.image}
                        alt={item.title}
                        effect="blur"
                        className="max-h-48 rounded object-cover"
                    />
                </div>
                <h2 className="mt-4 text-center text-sm text-gray-700">
                    {item.title}
                </h2>
                <p className="mt-1 text-center text-lg font-medium text-gray-900">
                    ${item.price}
                </p>
            </div>
        </Link>
    )
}

export default function ProductGrid({ category }) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadItems() {
            setIsLoading(true)
            const fetchedItems = await fetchStoreItems()
            setItems(fetchedItems[category])
            setIsLoading(false)
        }
        loadItems().catch((err) => setError(err.message))
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }

    console.log(items)
    return (
        <>
            <div className="bg-white font-body">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-20">
                                {items.slice(0, 3).map((item) => (
                                    <ProductCard key={item.id} item={item} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

'use client'
import { useState, useEffect, cache } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Link from 'next/link'
import { Product } from './cartButton'
import { Sidebar } from './sidebar'

export const categoryMapping = {
    Men: "men's clothing",
    Women: "women's clothing",
    Accessories: 'jewelery',
}

const reverseCategoryMapping = Object.fromEntries(
    Object.entries(categoryMapping).map(([k, v]) => [v, k])
)

const fetchStoreItems = cache(async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products', {
        next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
})

export function ProductCard({ item }: { item: Product }) {
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

export default function ProductGrid({
    initialCategory,
}: {
    initialCategory: string | null
}) {
    const [allItems, setAllItems] = useState<Product[]>([])
    const [filteredItems, setFilteredItems] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        initialCategory
    )
    const [minRating, setMinRating] = useState(0)

    useEffect(() => {
        async function loadItems() {
            setIsLoading(true)
            try {
                const fetchedItems = await fetchStoreItems()
                if (Array.isArray(fetchedItems) && fetchedItems.length > 0) {
                    setAllItems(fetchedItems.flat())
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred'
                )
            } finally {
                setIsLoading(false)
            }
        }
        loadItems()
    }, [])

    useEffect(() => {
        setFilteredItems(
            allItems.filter(
                (item) =>
                    (selectedCategory
                        ? categoryMapping[
                              selectedCategory as keyof typeof categoryMapping
                          ] === item.category
                        : true) && item.rating.rate >= minRating
            )
        )
    }, [allItems, selectedCategory, minRating])

    useEffect(() => {
        setSelectedCategory(initialCategory)
    }, [initialCategory])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="flex">
            <Sidebar
                categories={Object.keys(categoryMapping)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minRating={minRating}
                setMinRating={setMinRating}
            />
            <div className="flex-grow bg-white font-body md:-ml-10 xl:-ml-24">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-20">
                            {filteredItems.map((item) => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

'use client'
import Hero from '../components/hero'
import ProductGrid from '../components/productGrid'

export default function Home() {
    return (
        <>
            <Hero />
            <ProductGrid category={1} />
        </>
    )
}

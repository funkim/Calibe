'use client'
import { useParams } from 'next/navigation'
import ProductGrid from '@/components/productGrid'

const categoryMapping = {
    Men: "men's clothing",
    Women: "women's clothing",
    Accessories: 'jewelery',
}

export default function CategoryPage() {
    const params = useParams()
    const category = params.category as keyof typeof categoryMapping | null

    return <ProductGrid initialCategory={category} />
}

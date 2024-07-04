import Image from 'next/image'
import { Metadata } from 'next'
import StarRating from '@/components/starRating'
import { AddToCartButton } from '../../../components/cartButton'
import { Product } from '../../../components/cartButton'

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
}

export async function generateMetadata({
    params,
}: {
    params: { id: string }
}): Promise<Metadata> {
    const product = await getProduct(params.id)
    return {
        title: product.title,
        description: product.description,
    }
}

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const product = await getProduct(params.id)
    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-center md:mt-0 md:w-1/2 md:pl-8">
                        <h1 className="mb-4 font-title text-3xl">
                            {product.title}
                        </h1>
                        <p className="mb-4 font-body text-xl">
                            ${product.price}
                        </p>
                        <StarRating rating={product.rating.rate} />
                        <p className="mb-4 mt-2 text-sm text-gray-600">
                            {product.rating.count} Reviews
                        </p>
                        <p className="mb-8 leading-normal">
                            {product.description}
                        </p>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </>
    )
}

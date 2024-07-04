import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import { CartProvider } from '@/components/cartContext'

export const metadata: Metadata = {
    title: 'Calibe - Sustainable Techwear',
    description: 'Sustainable techwear for the modern adventurer',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <html lang="en">
                <body>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </body>
            </html>
        </CartProvider>
    )
}

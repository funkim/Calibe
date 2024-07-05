'use client'
import { useContext } from 'react'
import { useCart } from './cartContext'
import { RemoveFromCartButton } from './cartButton'
interface CartPopupProps {
    isOpen: boolean
    onClose: () => void
}
export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
    if (!isOpen) return null
    const { cartItems, cartTotal } = useCart()

    return (
        <div className="fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-white shadow-xl md:relative md:w-96 md:animate-enterIn">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="mb-4 flex items-center justify-between"
                        >
                            <RemoveFromCartButton product={item} />
                            <div>
                                <h3 className="text-sm font-medium">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <p className="text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    <p className="font-body">
                        Total: ${cartTotal(cartItems).toFixed(2)}
                    </p>
                </div>
                <div className="border-t p-4">
                    <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

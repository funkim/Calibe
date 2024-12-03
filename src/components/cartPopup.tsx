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
            <div className="absolute right-0 top-0 h-full w-full overflow-hidden bg-white shadow-xl md:relative md:w-[448px] md:animate-enterIn">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Shopping Cart
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                </div>

                {/* Cart Items - Scrollable Area */}
                <div className="h-[calc(100vh-180px)] overflow-y-auto p-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="mb-6 flex items-start space-x-4 border-b border-gray-200 pb-6 last:mb-0 last:border-0 last:pb-0"
                        >
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-gray-900">
                                    {item.title}
                                </h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            </div>
                            <RemoveFromCartButton product={item} />
                        </div>
                    ))}
                </div>

                {/* Footer with Total and Checkout - Sticky */}
                <div className="sticky bottom-0 z-10 border-t border-gray-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-base font-medium text-gray-900">
                            Subtotal
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                            ${cartTotal(cartItems).toFixed(2)}
                        </span>
                    </div>
                    <button className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

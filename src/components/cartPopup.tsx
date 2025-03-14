'use client'
import { useContext, useState } from 'react'
import { useCart } from './cartContext'

export default function CartPopup() {
    const { cartItems, cartTotal, isCartOpen, closeCart, updateItemQuantity } =
        useCart()
    const [editingQuantity, setEditingQuantity] = useState<{
        [key: number]: string
    }>({})

    if (!isCartOpen) return null

    const handleQuantityChange = (itemId: number, value: string) => {
        // Store the input value as a string to allow for empty inputs during editing
        setEditingQuantity({
            ...editingQuantity,
            [itemId]: value,
        })
    }

    const handleQuantityBlur = (itemId: number, currentQuantity: number) => {
        const newQuantity = parseInt(editingQuantity[itemId] || '0', 10)

        // Only update if the value is valid and different
        if (!isNaN(newQuantity) && newQuantity !== currentQuantity) {
            updateItemQuantity(itemId, newQuantity)
        }

        // Reset the editing state to show the actual quantity
        setEditingQuantity({
            ...editingQuantity,
            [itemId]: '',
        })
    }

    const handleIncrement = (itemId: number, currentQuantity: number) => {
        updateItemQuantity(itemId, currentQuantity + 1)
    }

    const handleDecrement = (itemId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            updateItemQuantity(itemId, currentQuantity - 1)
        }
    }

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
                            onClick={closeCart}
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
                    {cartItems.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center">
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="mb-6 flex items-start space-x-4 border-b border-gray-200 pb-6 last:mb-0 last:border-0 last:pb-0"
                            >
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-900">
                                        {item.title}
                                    </h3>
                                    <div className="mt-1 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleDecrement(
                                                        item.id,
                                                        item.quantity
                                                    )
                                                }
                                                className="h-8 w-8 rounded-l border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={
                                                    editingQuantity[item.id] !==
                                                    undefined
                                                        ? editingQuantity[
                                                              item.id
                                                          ]
                                                        : item.quantity
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={() =>
                                                    handleQuantityBlur(
                                                        item.id,
                                                        item.quantity
                                                    )
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.currentTarget.blur()
                                                    }
                                                }}
                                                className="h-8 w-12 border-y border-gray-300 text-center text-sm"
                                                aria-label="Quantity"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleIncrement(
                                                        item.id,
                                                        item.quantity
                                                    )
                                                }
                                                className="h-8 w-8 rounded-r border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        updateItemQuantity(item.id, 0)
                                    }
                                    className="text-gray-400 hover:text-gray-500"
                                    aria-label="Remove item"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
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
                    <button
                        className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

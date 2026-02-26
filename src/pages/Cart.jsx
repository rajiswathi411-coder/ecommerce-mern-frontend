import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const {
        cartItems,
        increaseQty,
        decreaseQty,
        removeFromCart
    } = useContext(CartContext);
    const navigate = useNavigate()
    return (

        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-6 border-b pb-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p>${item.price}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => decreaseQty(item._id)}
                                            className="bg-gray-300 px-3 py-1 rounded"
                                        >
                                            -
                                        </button>

                                        <span className="font-semibold">{item.qty}</span>

                                        <button
                                            onClick={() => increaseQty(item._id)}
                                            className="bg-gray-300 px-3 py-1 rounded"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="ml-4 text-red-600 font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="font-bold text-blue-600">
                                    ${item.price * item.qty}
                                </div>
                            </div>
                        ))}

                        {/* Grand Total */}
                        <div className="text-right text-xl font-bold mt-6">
                            Total: $
                            {cartItems
                                .reduce((acc, item) => acc + item.price * item.qty, 0)
                                .toFixed(2)}
                        </div>

                        <div className="text-right mt-4">
                            <button
                                onClick={() => navigate("/checkout")}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
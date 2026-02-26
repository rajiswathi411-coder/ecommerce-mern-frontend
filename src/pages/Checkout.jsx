import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config"; // adjust path if needed

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Update form fields
  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);


  const placeOrder = async () => {
  if (!shipping.address || !shipping.city || !shipping.postalCode || !shipping.country) {
    alert("Please fill all shipping fields");
    return;
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Transform cart items properly
  const orderItems = cartItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item._id, // VERY IMPORTANT
  }));

  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        orderItems,
        shippingAddress: shipping,
        totalPrice: total,
      }),
    });

    if (!response.ok) {
      throw new Error("Order failed");
    }

    const data = await response.json();
    console.log("Order placed:", data);

    clearCart();
    navigate("/order-success", {state: {order: data}});

  } catch (error) {
    alert(error.message);
  }
};
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <h3 className="text-xl font-semibold mb-2">Shipping Info</h3>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shipping.address}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shipping.city}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shipping.postalCode}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shipping.country}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between mb-1">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="font-bold mb-4">Total: ${total.toFixed(2)}</p>

        <button
          onClick={placeOrder}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
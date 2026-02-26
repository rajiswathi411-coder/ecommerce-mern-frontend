import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { getMyOrders } from "../../../backend/controllers/orderController";
import { API_URL } from "../config"; // adjust path if needed

function Account() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("userInfo");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      setUser(user);

      try {
        // Fetch orders from backend
        const { data } = await axios.get(
          `${API_URL}/api/orders/myOrders`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrders(data); // save backend orders in state
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Please login to view your account.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Hello, {user.name}</h1>

        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border rounded p-4 bg-gray-50 shadow-sm"
              >
                <p className="font-semibold mb-2">
                  Order Date: {new Date(order.createdAt || order.date).toLocaleString()}
                </p>

                <div className="space-y-2 mb-2">
                  {order.orderItems.map((item, index) => (
                    <div key={`${item.product}-${index}` }className="flex justify-between">
                      <span>{item.name} x {item.qty}</span>
                      <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <p className="font-bold text-blue-600">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>

                <p className="text-gray-600">
                  Shipping: {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Account;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  // Safety check
  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          🎉 Order Placed Successfully!
        </h2>
        <p className="mb-4">Thank you for your purchase.</p>

        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        <ul className="mb-4 text-left">
          {order.orderItems?.map((item) => (
            <li key={item._id} className="flex justify-between mb-1">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p className="font-bold mb-4">
          Total: ${order.totalPrice?.toFixed(2)}
        </p>

        <h3 className="text-xl font-semibold mb-2">Shipping Info</h3>
        <p>
          {order.shippingAddress?.address},{" "}
          {order.shippingAddress?.city}
        </p>
        <p>
          {order.shippingAddress?.postalCode},{" "}
          {order.shippingAddress?.country}
        </p>

        <p className="mb-4">
          Order Date:{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "N/A"}
        </p>

        <Link
          to="/account"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (product) => {
    const existItem = cartItems.find((item) => item._id === product._id);

    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/product/:id"
          element={<Product addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<ProtectedRoute> <Checkout /> </ProtectedRoute>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/account" element={<ProtectedRoute>
          <Account />
        </ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
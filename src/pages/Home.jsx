import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { API_URL } from "../config"; // adjust path if needed

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      console.log("FULL DATA:",data)
      console.log("FIRST PRODUCT:",data[0])
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gray-100">

      {/* HERO SECTION */}
      <div className="w-full h-[450px] bg-blue-600 flex items-center justify-center relative overflow-hidden -mt-20">
        <img
          src="/assets/hero.jpg"
          alt="Hero Banner"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute text-center text-white px-5">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Welcome to GadgetHub
          </h1>
          <p className="text-xl mb-6 drop-shadow-md">
            Discover the latest tech gadgets and accessories
          </p>
          <Link 
          to="/products" className="bg-blue-600 hover:bg-blue-700
           text-white font-semibold py-3 px-6 rounded shadow-lg transition">
            Shop Now
          </Link>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="px-10 py-12">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-700 mb-3 text-sm">{product.description}</p>
              <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>
              <Link to={`/product/${product._id}`} key={product._id}>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                View Product
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
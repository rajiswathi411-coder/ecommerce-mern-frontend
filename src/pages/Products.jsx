import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    return (
      (category === "all" || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Extract unique categories dynamically
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded shadow p-4 flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <Link
              to={`/product/${product._id}`}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
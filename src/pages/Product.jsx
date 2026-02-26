import React, { useEffect, useState , useContext} from "react";
import { CartContext } from "../context/CartContext";
import { useParams , useNavigate} from "react-router-dom";
import { API_URL } from "../config"; // adjust path if needed

function Product() {
    const { addToCart } = useContext(CartContext);
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate()
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error)
    }
  }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-blue-600 font-bold text-2xl mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-gray-600 mb-4">In Stock: {product.countInStock}</p>
          <button onClick={()=>{  addToCart(product); navigate("/cart")}} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
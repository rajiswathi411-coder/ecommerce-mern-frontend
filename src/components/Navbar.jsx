import React, { useState ,useEffect} from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { totalItems } = useContext(CartContext)
  
  const navigate = useNavigate()
  useEffect(() => {
  const storedUser = localStorage.getItem("userInfo");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null);
  }
}, []);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUser(null)
  navigate("/login")
  };

  return (
    <nav className="bg-blue-600 text-white  fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Brand Name */}
          <Link to="/" className="text-2xl font-bold">
            GadgetHub
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200 font-medium transition">
              Home
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 font-medium"
            >
              Cart
            </Link>
{localStorage.getItem("userInfo") ? (
  <>
    <span className="hover:text-gray-200 font-medium transition">
      Hello, {JSON.parse(localStorage.getItem("userInfo")).name}
    </span>

    <Link
      to="/account"
      className="hover:text-gray-200 font-medium transition"
    >
      Account
    </Link>

    <button
      onClick={logoutHandler}
      className="hover:text-gray-200 font-medium transition"
    >
      Logout
    </button>
  </>
) : (
  <Link
    to="/login"
    className="hover:text-gray-200 font-medium transition"
  >
    Login
  </Link>
)}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

       {/* Mobile Menu */}
{isOpen && (
  <div className="md:hidden mt-2 space-y-2 px-2 pb-3">
    <Link
      to="/"
      onClick={() => setIsOpen(false)}
      className="block px-3 py-2 rounded hover:bg-blue-500 transition"
    >
      Home
    </Link>
    <Link
      to="/cart"
      onClick={() => setIsOpen(false)}
      className="block px-3 py-2 rounded hover:bg-blue-500 transition"
    >
      Cart
    </Link>
    {user ? (
  <div className="block px-3 py-2">
    <span className="block mb-1">Hello, {user.name}</span>

    <Link
      to="/account"
      onClick={() => setIsOpen(false)}
      className="block mb-1 hover:text-gray-200 transition"
    >
      Account
    </Link>

    <button
      onClick={() => { logoutHandler(); setIsOpen(false); }}
      className="block w-full text-left hover:text-gray-200 transition"
    >
      Logout
    </button>
  </div>
) : (
      <Link
        to="/login"
        onClick={() => setIsOpen(false)}
        className="block px-3 py-2 rounded hover:bg-blue-500 transition"
      >
        Login
      </Link>
    )}
    <Link to="/signup">Signup</Link>
  </div>
)}
      </div>
    </nav>
  );
}

export default Navbar;
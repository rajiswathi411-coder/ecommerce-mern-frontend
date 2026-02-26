import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer"; // Make sure you import your Footer
import { API_URL } from "../config"; // adjust path if needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Full height */}
      <div className="flex-grow flex justify-center items-center">
        <form onSubmit={submitHandler} className="bg-white p-6 shadow-md w-80">
          <h2 className="text-xl mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-black text-white w-full p-2 mt-2">
            Login
          </button>

          <p className="mt-3 text-sm text-center">
            Dont't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
            Register
            </Link>
          </p>
        </form>
      </div>


    </div>
  );
}

export default Login;
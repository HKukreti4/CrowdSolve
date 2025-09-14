import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axiosInstance from "./../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", registerData);
      if (res) {
        toast.success("Registration Successful");
        navigate("/login");
        setRegisterData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Create Account
        </h3>
        <p className="text-center text-gray-500 mb-6">
          Fill in your details to get started
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={registerData.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={registerData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={registerData.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-600 hover:underline">
            Login Now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [loginData, setloginData] = useState({
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
      const res = await axiosInstance.post("/auth/login", loginData);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        toast.success("Login Successful");
        navigate("/");
        setloginData({ email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Welcome Back
        </h3>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and password to access your account
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
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
              value={loginData.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setloginData({ ...loginData, [e.target.name]: e.target.value })
              }
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
              value={loginData.password}
              onChange={(e) =>
                setloginData({ ...loginData, [e.target.name]: e.target.value })
              }
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="text-indigo-600 hover:underline">
            Register Now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;

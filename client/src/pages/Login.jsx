import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axiosInstance from "./../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loginData);
    try {
      const res = await axiosInstance.post("/auth/login", loginData);
      if (res) {
        setUser(res.data.user);
        navigate("/");
        setloginData({ email: "", password: "" });
        toast.success("Login Successfull");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 bg-gradient-to-r from-red-400 to-indigo-600">
      <div className="text-center flex flex-col gap-2  bg-white/60 backdrop:blur-2xl  border-2 border-gray-400 py-8 px-12 rounded-md">
        <h3 className="md:text-2xl text-md font-bold text-red-400 capitalize ">
          Welcome back
        </h3>
        <p>Enter your email and password to access the account</p>
        {/* <DarkModeToggle /> */}

        <form
          onSubmit={(e) => submitHandler(e)}
          className="text-left flex mt-5 flex-col gap-4 items-center"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              placeholder="Enter email"
              onChange={(e) =>
                setloginData({ ...loginData, [e.target.name]: e.target.value })
              }
              className="border-[1px] focus:border-green-400 outline-none px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-bold">
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
              placeholder="Enter password"
              className="border-[1px] w-full focus:border-green-400 outline-none px-4 py-2 rounded-md"
            />
          </div>
          {loading ? (
            <button
              type="button"
              className="bg-gray-500 cursor-not-allowed text-white rounded-md py-2"
            >
              Loading ...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-gray-500 px-4 w-full cursor-pointer text-white rounded-md py-2"
            >
              Login
            </button>
          )}
        </form>

        <p>
          Don't have an accout ?{" "}
          <NavLink to={"/register"} className="text-blue-400">
            Register Now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;

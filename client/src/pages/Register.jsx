import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axiosInstance from "./../utils/axiosInstance";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";

const Register = () => {
  const [loginData, setloginData] = useState({
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
    console.log(loginData);
    try {
      const res = await axiosInstance.post("/auth/register", loginData);
      if (res) {
        setUser(res.data.user);
        navigate("/login");
        setloginData({ email: "", password: "", name: "" });
        toast.success("Registration Successfull");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser.email) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 bg-gradient-to-r from-red-400 to-indigo-600">
      <div className="text-center flex flex-col gap-2  bg-white/60 backdrop:blur-2xl  border-2 border-gray-400 py-8 px-12 rounded-md">
        <h3 className="md:text-2xl text-md font-bold text-red-400 capitalize ">
          Register
        </h3>
        <p>Enter your name, email and password to create the account</p>

        <form
          onSubmit={(e) => submitHandler(e)}
          className="text-left flex mt-5 flex-col gap-4 items-center"
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={loginData.name}
              placeholder="Enter name"
              onChange={(e) =>
                setloginData({ ...loginData, [e.target.name]: e.target.value })
              }
              className="border-[1px] focus:border-green-400 outline-none px-4 py-2 rounded-md"
            />
          </div>
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
              Register
            </button>
          )}
        </form>

        <p>
          Already have an accout ?{" "}
          <NavLink to={"/login"} className="text-blue-400">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

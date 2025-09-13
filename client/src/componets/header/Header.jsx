import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "./Navbar";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null); // ✅ clear user from context
      toast.success("Logged out successfully");
      navigate("/login"); // ✅ redirect if needed
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {}, [user]);
  console.log(user);
  return (
    <header className="bg-black text-white min-h-[50vh] p-6 text-center  flex items-center justify-center ">
      <div>
        <h1 className="text-4xl font-bold mb-2">CrowdSolve</h1>
        <p className="text-lg mb-4">
          Join the community to solve real-world problems together.
        </p>
      </div>
    </header>
  );
}

export default Header;

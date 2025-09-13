import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";

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
    <header className="bg-blue-600 text-white p-6 text-center">
      <h1 className="text-4xl font-bold mb-2">CrowdSolve</h1>
      <p className="text-lg mb-4">
        Join the community to solve real-world problems together.
      </p>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <NavLink to="/register">
            <button className="bg-white text-blue-600 font-bold py-2 cursor-pointer px-4 rounded mr-2">
              Sign Up
            </button>
          </NavLink>
          <NavLink to="/login">
            <button className="bg-blue-800 text-white font-bold py-2 cursor-pointer px-4 rounded">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;

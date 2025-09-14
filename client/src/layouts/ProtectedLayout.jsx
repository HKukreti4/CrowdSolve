import React, { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        // Optionally set the user in context if needed
        // setUser(storedUser);
        setCheckingAuth(false);
      } else {
        navigate("/login");
      }
    } else {
      setCheckingAuth(false);
    }
  }, [user, navigate]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-64">
        Checking authentication...
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedLayout;

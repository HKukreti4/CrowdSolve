import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, replace } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedLayout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user?.email && (!storedUser || !storedUser.email)) {
      navigate("/login", { replace: true });
    } else if (!user?.email && storedUser?.email) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [user, navigate, setUser]);

  if (loading) {
    return <div>Checking user...</div>;
  }

  return user?.email ? (
    <div className="my-4 md:my-2">
      <Outlet />
    </div>
  ) : null;
};

export default ProtectedLayout;

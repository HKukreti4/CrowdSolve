import { createContext, useState, useEffect } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // Initialize from localStorage
  useEffect(() => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    if (storedUser?.email) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);
  console.log(user);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

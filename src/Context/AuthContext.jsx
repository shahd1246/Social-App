import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      setUserData(data?.data.user);
    } catch (error) {
      console.log("Profile data error:", error.response?.data || error);
      setUserData(null);
    }
  }

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("token", userToken);
      getUserData();
    } else {
      setUserData(null);
      localStorage.removeItem("token");
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
import api, { setAuthToken } from "./api";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [token, setToken] = useState(() => {//the token variable has a setter function called setToken
    return localStorage.getItem("token") || null;
  });

  // Update axios when token changes
  useEffect(() => {//if change in dep is detected call fucntion
    setAuthToken(token); //this sets the auth token for the api calls
    if (token) {
      localStorage.setItem("token", token); //if token not empty save to local storage
    } else {
      localStorage.removeItem("token"); //else delete 
    }
  }, [token]);

  // ---------- LOGIN ----------
  async function login(email, password) {
    try {
      const response = await api.post("/login", { email, password });
      setToken(response.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  }

  // ---------- LOGOUT ----------
  function logout() {
    setToken(null);
  }

  // ---------- REST WITH AUTH ----------
  async function restWithAuth(method, url, data = null) {
    if (!token) throw new Error("Not authenticated");

    return api({ //this calls the api function in api.js which makes a rest api request
      method,
      url,
      data,
    });
  }

  // Convenience wrappers
  const getWithAuth = (url) => restWithAuth("get", url);
  const postWithAuth = (url, data) => restWithAuth("post", url, data);
  const putWithAuth = (url, data) => restWithAuth("put", url, data);

  return (
    <SessionContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        restWithAuth,
        getWithAuth,
        postWithAuth,
        putWithAuth,
      }}
    >
      {children} 
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

import axios from "axios";

const api = axios.create({ //axios - managble api and faster
  baseURL: "http://localhost:5000", // Change if needed
  headers: {
    "Content-Type": "application/json", //set url and content type for all request to backend
  },
});

// Use this to attach token dynamically later
export function setAuthToken(token) {
  if (token) {
    console.log(token)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;

import { useState } from "react";
import { useSession } from "./SessionContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, loading } = useSession();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const result = await login(email, password);

    if (result.success) {
      navigate("/watermark"); // Redirect on successful login
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <h1>Login</h1>

      Email:&nbsp;
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      Password:&nbsp;
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </>
  );
}

export default Login;

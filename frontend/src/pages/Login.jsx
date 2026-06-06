import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = () => {

    if (
      email === "admin@tdc.com" &&
      password === "123456"
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");

    } else {

      setError(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>TDC CRM</h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;
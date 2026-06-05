import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>TDC Matchmaker CRM</h1>

        <h2>Welcome Back</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Enter Email"
        />

        <input
          className="login-input"
          type="password"
          placeholder="Enter Password"
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;
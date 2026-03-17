import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/users");

      if (!response.ok) {
        throw new Error("Server error");
      }

      const users = await response.json();

      const user = users.find(
        (u) =>
          u.email.toLowerCase() === form.email.toLowerCase() &&
          u.password === form.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role || "STUDENT"); // 🔥 important
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Backend not running or error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link to="/register">
          <p className="link-text">
            Don't have an account? Register
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
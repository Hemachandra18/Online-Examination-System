import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "STUDENT"
      })
    });

    if (response.ok) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Create Account</button>

        <Link to="/login">
          <button className="link-btn">
            Already have an account? Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
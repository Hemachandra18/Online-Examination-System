import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>Welcome, {user?.name}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
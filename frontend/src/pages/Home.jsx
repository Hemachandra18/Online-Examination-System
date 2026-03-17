import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Online Examination System</h1>
        <p>Secure. Fast. Reliable.</p>

        <div className="home-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
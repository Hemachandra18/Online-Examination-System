import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ExamPage from "./pages/ExamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main app */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Full screen exam */}
      <Route path="/exam/:id" element={<ExamPage />} />
    </Routes>
  );
}

export default App;
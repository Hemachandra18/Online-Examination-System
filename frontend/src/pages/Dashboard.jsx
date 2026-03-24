import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("home");
  const [exams, setExams] = useState([]);
  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Resume alert
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const examKey = keys.find(k => k.startsWith("exam_"));

    if (examKey) {
      const examId = examKey.split("_")[1];

      const shouldResume = window.confirm(
        "You have an unfinished exam. Do you want to resume?"
      );

      if (shouldResume) {
        navigate(`/exam/${examId}`);
      }
    }
  }, []);

  // Save tab
  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  // Fetch exams
  useEffect(() => {
    if (tab === "exam") {
      fetch(`${import.meta.env.VITE_API_URL}/exams`)
        .then(res => res.json())
        .then(data => setExams(data))
        .catch((err) => console.error("Error fetching exams:", err));
    }
  }, [tab]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setTab={setTab} activeTab={tab} />

      <div style={{ flex: 1, padding: "20px" }}>
        
        {/* USER INFO */}
        {user && (
          <div style={styles.userCard}>
            <div>
              <h3>
                {new Date().getHours() < 12
                  ? "Good Morning"
                  : new Date().getHours() < 18
                  ? "Good Afternoon"
                  : "Good Evening"}
                , {user.name || "User"} 👋
              </h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role || "STUDENT"}</p>
            </div>

            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        )}

        <h2 style={{ marginBottom: "20px" }}>
          {tab === "home" && "Dashboard"}
          {tab === "exam" && "Available Exams"}
          {tab === "admin" && "Admin Panel"}
        </h2>

        {/* HOME */}
        {tab === "home" && (
          <p>Select an option from the sidebar.</p>
        )}

        {/* EXAMS */}
        {tab === "exam" && (
          <div>
            {exams.length === 0 ? (
              <p>Loading exams...</p>
            ) : (
              exams.map((exam) => {
                const saved = localStorage.getItem(`exam_${exam.id}`);
                const submitted = localStorage.getItem(`submitted_${exam.id}`);

                let resumeData = null;
                if (saved) {
                  try {
                    resumeData = JSON.parse(saved);
                  } catch {}
                }

                const answeredCount = resumeData
                  ? Object.keys(resumeData.answers || {}).length
                  : 0;

                const timeLeft = resumeData ? resumeData.timeLeft : null;

                return (
                  <div
                    key={exam.id}
                    style={styles.examCard}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <h3>{exam.title}</h3>
                    <p>Duration: {exam.duration} mins</p>

                    {submitted ? (
                      <button style={styles.completedBtn} disabled>
                        Completed
                      </button>
                    ) : resumeData ? (
                      <div style={styles.resumeBox}>
                        <span style={styles.badge}>In Progress</span>

                        <p>
                          Answered: <strong>{answeredCount}</strong>
                          <br />
                          Time Left:{" "}
                          <strong>
                            {Math.floor(timeLeft / 60)}:
                            {(timeLeft % 60)
                              .toString()
                              .padStart(2, "0")}
                          </strong>
                        </p>

                        <button
                          style={styles.resumeBtn}
                          onClick={() =>
                            navigate(`/exam/${exam.id}`)
                          }
                        >
                          Resume Exam
                        </button>
                      </div>
                    ) : (
                      <button
                        style={styles.startBtn}
                        onClick={() =>
                          navigate(`/exam/${exam.id}`)
                        }
                      >
                        Start Exam
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ADMIN */}
        {tab === "admin" && <p>Admin Panel Coming Soon</p>}
      </div>
    </div>
  );
}

// STYLES
const styles = {
  userCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#f9f9f9",
  },
  logoutBtn: {
    background: "red",
    color: "white",
    padding: "8px",
    border: "none",
  },
  examCard: {
    padding: "18px",
    marginBottom: "18px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  startBtn: {
    background: "orange",
    padding: "8px",
    border: "none",
  },
  resumeBtn: {
    background: "green",
    color: "white",
    padding: "8px",
    border: "none",
  },
  completedBtn: {
    background: "gray",
    color: "white",
    padding: "8px",
    border: "none",
  },
  resumeBox: {
    background: "#e6f7ff",
    padding: "10px",
    borderRadius: "6px",
  },
  badge: {
    background: "orange",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
  },
};
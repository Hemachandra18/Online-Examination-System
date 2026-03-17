export default function Sidebar({ setTab, activeTab }) {
  const role = localStorage.getItem("role");

  return (
    <div style={styles.sidebar}>
      <div
        style={activeTab === "home" ? styles.active : styles.item}
        onClick={() => setTab("home")}
      >
        Home
      </div>

      <div
        style={activeTab === "exam" ? styles.active : styles.item}
        onClick={() => setTab("exam")}
      >
        Exams
      </div>

      {role === "ADMIN" && (
        <div
          style={activeTab === "admin" ? styles.active : styles.item}
          onClick={() => setTab("admin")}
        >
          Admin
        </div>
      )}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    background: "#111",
    color: "white",
    height: "100vh",
    padding: "20px",
  },
  item: {
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  active: {
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    borderLeft: "4px solid orange",
    background: "#222",
  },
};
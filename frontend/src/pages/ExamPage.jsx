import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";

function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(null);

  // Fetch exam + questions
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/exams`)
      .then(res => res.json())
      .then(exams => {
        const exam = exams.find(e => e.id === parseInt(id));
        if (exam) {
          let defaultTime = exam.duration * 60;

          const savedData = localStorage.getItem(`exam_${id}`);
          if (savedData) {
            const parsed = JSON.parse(savedData);
            setAnswers(parsed.answers || {});
            setTimeLeft(parsed.timeLeft || defaultTime);
            setCurrentIndex(parsed.currentIndex || 0);
          } else {
            setTimeLeft(defaultTime);
          }
        }
      });

    fetch(`${import.meta.env.VITE_API_URL}/questions/exam/${id}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [id]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 && questions.length > 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  // Auto-save
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(
        `exam_${id}`,
        JSON.stringify({
          answers,
          timeLeft,
          currentIndex
        })
      );
    }
  }, [answers, timeLeft, currentIndex, questions, id]);

  const submitExam = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    localStorage.removeItem(`exam_${id}`);
    localStorage.setItem(`submitted_${id}`, "true");
    setScore(correct);
  };

  // 🔥 RESULT + REVIEW MODE
  if (score !== null) {
    return (
      <div style={styles.resultContainer}>
        <div style={{ width: "80%" }}>
          <div style={styles.resultCard}>
            <h2>🎉 Exam Completed</h2>

            <h1
              style={{
                color: score / questions.length > 0.5 ? "green" : "red"
              }}
            >
              {score} / {questions.length}
            </h1>

            <button
              style={styles.button}
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>

          {/* 🔥 REVIEW */}
          <div style={{ marginTop: "30px" }}>
            <h2>Review Answers</h2>

            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const correct = q.correctAnswer;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: "15px",
                    marginBottom: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    background:
                      userAnswer === correct ? "#e6ffe6" : "#ffe6e6"
                  }}
                >
                  <h4>Q{index + 1}. {q.questionText}</h4>

                  <p>
                    Your Answer:{" "}
                    <strong>
                      {userAnswer || "Not Attempted"}
                    </strong>
                  </p>

                  <p>
                    Correct Answer: <strong>{correct}</strong>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <Layout>
        <p>Loading questions...</p>
      </Layout>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Layout>
      <div style={styles.container}>

        <div style={styles.header}>
          <h2>Exam</h2>
          <div style={styles.timer}>
            ⏳ {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div style={styles.body}>

          <div style={styles.panel}>
            {questions.map((q, index) => (
              <div
                key={q.id}
                style={{
                  ...styles.qNumber,
                  background:
                    index === currentIndex
                      ? "orange"
                      : answers[q.id]
                      ? "green"
                      : "#ccc",
                }}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h3>Question {currentIndex + 1}</h3>
            <p>{currentQuestion.questionText}</p>

            {["A", "B", "C", "D"].map(option => (
              <label key={option} style={styles.option}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: option
                    })
                  }
                />
                {currentQuestion["option" + option]}
              </label>
            ))}

            <div style={styles.nav}>
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
              >
                Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button onClick={submitExam}>Submit</button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default ExamPage;

// styles unchanged
const styles = {
  container: { padding: "20px" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  timer: { fontWeight: "bold", color: "red" },
  body: { display: "flex", gap: "20px" },
  panel: { width: "120px", display: "flex", flexWrap: "wrap", gap: "10px" },
  qNumber: {
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "5px",
  },
  card: { flex: 1, padding: "20px", border: "1px solid #ccc", borderRadius: "10px" },
  option: { display: "block", margin: "10px 0" },
  nav: { marginTop: "20px", display: "flex", justifyContent: "space-between" },
  resultContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    padding: "20px"
  },
  resultCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "orange",
    border: "none",
    cursor: "pointer",
  },
};
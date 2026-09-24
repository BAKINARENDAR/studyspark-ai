import { useRef, useState } from "react";
import FlashcardDeck from "./components/FlashCardDeck";
import PromptInput from "./components/PromptInput";
import { generateStudyMaterial } from "./lib/api";

import "./App.css";
import Quiz from "./components/Quiz";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

 
  const requestIdRef = useRef(0);

  async function handleGenerate(input) {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generateStudyMaterial(input);

      
      if (requestId !== requestIdRef.current) {
        return;
      }

      setResult(data);
    } catch (error) {
      
      if (requestId !== requestIdRef.current) {
        return;
      }

      console.error("Generation failed:", error);

      setError(
        error.message ||
          "Something went wrong while generating your study set."
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }
  function handleNewStudySet() {
  setResult(null);
  setError("");
  setLoading(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  return (
    <main className="app">
    <header className="hero">
  <div className="hero-badge">
    AI-POWERED LEARNING
  </div>

  <h1>
    Learn smarter.
    <span> Not harder.</span>
  </h1>

  <p>
    Turn any topic or study notes into an
    interactive learning experience with
    AI-generated flashcards and quizzes.
  </p>
</header>

      <div className="container">
        <PromptInput
          onGenerate={handleGenerate}
          loading={loading}
        />

        {loading && (
          <div className="status-card">
            <div className="spinner"></div>

            <div>
              <strong>Creating your study set...</strong>

              <p>
                Groq is generating flashcards and
                quiz questions.
              </p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="error-card">
            <strong>
              Couldn't generate the study set
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
            >
              Dismiss
            </button>
          </div>
        )}

        {result && !loading && !error && (
          <section className="result-preview">
            <div className="result-header">
              <span className="result-label">
                GENERATED STUDY SET
              </span>

              <h2>{result.topic}</h2>

              <p>{result.summary}</p>
            </div>

            <div className="result-stats">
              <div>
                <strong>
                  {result.flashcards.length}
                </strong>
                <span>Flashcards</span>
              </div>

              <div>
                <strong>
                  {result.quiz.length}
                </strong>
                <span>Quiz Questions</span>
              </div>
            </div>
          </section>
        )}
        {result && !loading && !error && (
  <FlashcardDeck
    flashcards={result.flashcards}
  />
)}
{result && !loading && !error && (
  <Quiz
    questions={result.quiz}
  />
)}
{result && !loading && !error && (
  <div className="new-study-set-wrapper">
    <button
      type="button"
      className="new-study-set-button"
      onClick={handleNewStudySet}
    >
      + Generate New Study Set
    </button>
  </div>
)}
      </div>
    </main>
  );
}

export default App;
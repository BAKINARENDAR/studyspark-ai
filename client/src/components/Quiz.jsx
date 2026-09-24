import { useEffect, useState } from "react";

function Quiz({ questions }) {
  const [activeQuestions, setActiveQuestions] =
    useState(questions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // Reset the quiz when new set is generated when the user clicks
  useEffect(() => {
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setWrongAnswers([]);
  }, [questions]);

  if (!activeQuestions || activeQuestions.length === 0) {
    return null;
  }

  const currentQuestion =
    activeQuestions[currentIndex];

  function handleAnswer(index) {
    if (answered) {
      return;
    }

    setSelectedAnswer(index);
    setAnswered(true);

    const isCorrect =
      index === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    } else {
      setWrongAnswers((previous) => [
        ...previous,
        currentQuestion,
      ]);
    }
  }

  function handleNext() {
    const isLastQuestion =
      currentIndex === activeQuestions.length - 1;

    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setCurrentIndex(
      (index) => index + 1
    );

    setSelectedAnswer(null);
    setAnswered(false);
  }

  function restartQuiz() {
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setWrongAnswers([]);
  }

  function retryWrongAnswers() {
    if (wrongAnswers.length === 0) {
      return;
    }

    setActiveQuestions(wrongAnswers);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setWrongAnswers([]);
  }

  if (finished) {
    return (
      <section className="quiz-section">
        <div className="quiz-result">
          <span className="section-label">
            QUIZ COMPLETE
          </span>

          <h2>Nice work!</h2>

          <div className="score">
            {score}
            <span>
              {" "}
              / {activeQuestions.length}
            </span>
          </div>

          <p>
            You answered {score} out of{" "}
            {activeQuestions.length} questions
            correctly.
          </p>

          {wrongAnswers.length > 0 && (
            <p className="wrong-count">
              {wrongAnswers.length} question
              {wrongAnswers.length === 1
                ? ""
                : "s"}{" "}
              need another review.
            </p>
          )}

          <div className="quiz-result-actions">
            {wrongAnswers.length > 0 && (
              <button
                type="button"
                className="retry-button"
                onClick={retryWrongAnswers}
              >
                Retry Wrong Answers
              </button>
            )}

            <button
              type="button"
              className="restart-button"
              onClick={restartQuiz}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            QUIZ
          </span>

          <h2>Test your knowledge</h2>
        </div>

        <span className="card-counter">
          {currentIndex + 1} /{" "}
          {activeQuestions.length}
        </span>
      </div>

      <div className="quiz-card">
        <h3>{currentQuestion.question}</h3>

        <div className="quiz-options">
          {currentQuestion.options.map(
            (option, index) => {
              const isCorrect =
                index ===
                currentQuestion.correctAnswer;

              const isSelected =
                index === selectedAnswer;

              let className = "quiz-option";

              if (
                answered &&
                isCorrect
              ) {
                className += " correct";
              }

              if (
                answered &&
                isSelected &&
                !isCorrect
              ) {
                className += " incorrect";
              }

              return (
                <button
                  key={`${currentQuestion.question}-${index}`}
                  type="button"
                  className={className}
                  onClick={() =>
                    handleAnswer(index)
                  }
                  disabled={answered}
                >
                  <span className="option-letter">
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <span>{option}</span>
                </button>
              );
            }
          )}
        </div>

        {answered && (
          <div
            className={`quiz-feedback ${
              selectedAnswer ===
              currentQuestion.correctAnswer
                ? "correct"
                : "incorrect"
            }`}
          >
            <strong>
              {selectedAnswer ===
              currentQuestion.correctAnswer
                ? "Correct!"
                : "Not quite."}
            </strong>

            <p>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {answered && (
          <button
            type="button"
            className="next-question-button"
            onClick={handleNext}
          >
            {currentIndex ===
            activeQuestions.length - 1
              ? "See Results"
              : "Next Question →"}
          </button>
        )}
      </div>

      <div className="quiz-score">
        Score:{" "}
        <strong>{score}</strong>
      </div>
    </section>
  );
}

export default Quiz;
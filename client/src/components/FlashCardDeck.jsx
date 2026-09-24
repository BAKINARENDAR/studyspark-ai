import { useState } from "react";

function FlashcardDeck({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return null;
  }

  const currentCard = flashcards[currentIndex];

  function nextCard() {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((index) => index + 1);
      setFlipped(false);
    }
  }

  function previousCard() {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      setFlipped(false);
    }
  }

  function handleFlip() {
    setFlipped((value) => !value);
  }

  return (
    <section className="flashcard-section">
      <div className="section-heading">
        <div>
          <span className="section-label">
            FLASHCARDS
          </span>

          <h2>Review what you learned</h2>
        </div>

        <span className="card-counter">
          {currentIndex + 1} / {flashcards.length}
        </span>
      </div>

      <button
        type="button"
        className={`flashcard ${flipped ? "is-flipped" : ""}`}
        onClick={handleFlip}
        aria-label={
          flipped
            ? "Show question"
            : "Show answer"
        }
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <span className="card-type">
              QUESTION
            </span>

            <h3>{currentCard.question}</h3>

            <span className="flip-hint">
              Click to reveal answer
            </span>
          </div>

          <div className="flashcard-face flashcard-back">
            <span className="card-type">
              ANSWER
            </span>

            <p>{currentCard.answer}</p>

            <span className="flip-hint">
              Click to see question
            </span>
          </div>
        </div>
      </button>

      <div className="flashcard-controls">
        <button
          type="button"
          onClick={previousCard}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={nextCard}
          disabled={
            currentIndex === flashcards.length - 1
          }
        >
          Next →
        </button>
      </div>
    </section>
  );
}

export default FlashcardDeck;
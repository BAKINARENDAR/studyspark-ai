import { useState } from "react";

function PromptInput({ onGenerate, loading }) {
  const [input, setInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    onGenerate(trimmedInput);
  }

  return (
    <form
      className="prompt-form"
      onSubmit={handleSubmit}
    >
     <textarea
  value={input}
  onChange={(event) =>
    setInput(event.target.value)
  }
  placeholder={`Paste your notes or enter a topic...

Example:
Explain Flam's AI-native interactive content formats like Flicks, Airboards, and Visual Agents.`}
  rows={7}
  maxLength={2000}
  disabled={loading}
/>

      <div className="prompt-footer">
        <span>
          {input.length} / 2000
        </span>

        <button
          type="submit"
          disabled={loading || !input.trim()}
        >
          {loading
            ? "Generating..."
            : "Generate Study Set"}
        </button>
      </div>
    </form>
  );
}

export default PromptInput;
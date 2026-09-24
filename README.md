# StudySpark AI

StudySpark AI is an AI-powered study assistant that converts a topic or study notes into an interactive learning experience.

Instead of simply chatting with the user, StudySpark generates structured study material that the user can actively interact with.

## Features

- Enter a topic or paste study notes
- AI-generated topic summary
- Interactive flip flashcards
- Multiple-choice quiz
- Instant quiz score
- Retry incorrect questions
- Loading state
- Error handling
- Empty-input handling
- Stale-response protection
- Responsive UI for desktop and mobile

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- Groq API
- Zod

## Project Structure

```text
studyspark-ai/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PromptInput.jsx
│   │   │   ├── FlashcardDeck.jsx
│   │   │   └── Quiz.jsx
│   │   ├── lib/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── server/
│   ├── index.js
│   ├── generate.js
│   ├── schema.js
│   ├── package.json
│   └── .env.example
│
└── README.md
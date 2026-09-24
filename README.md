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
│   └── .env
│
└── README.md



How It Works
The user enters a topic or pastes study notes.
React sends the input to the Express backend.
The backend sends a structured prompt to the Groq LLM.
The LLM generates study material as JSON.
The backend parses the JSON response.
Zod validates the generated response structure.
The validated data is returned to the React frontend.
React renders the summary, flashcards and quiz.
The user interacts with the flashcards and completes the quiz.


AI-Generated Output

The AI generates a structured study set containing:

{
  "topic": "string",
  "summary": "string",
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ],
  "quiz": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "correctAnswer": 0,
      "explanation": "string"
    }
  ]
}

The backend validates this structure before the data reaches the UI.

Setup
1. Clone the repository
git clone https://github.com/BAKINARENDAR/studyspark-ai.git
cd studyspark-ai
2. Install frontend dependencies
cd client
npm install
3. Install backend dependencies

Open another terminal:

cd server
npm install
4. Configure the API key

Create:

server/.env

Add:

PORT=5000
GROQ_API_KEY=your_groq_api_key

The API key is stored on the backend and is never exposed to the browser.

5. Start the backend

Inside the server folder:

npm run dev

The backend runs on:

http://localhost:5000
6. Start the frontend

Inside the client folder:

npm run dev

Open the local URL provided by Vite.

Error Handling

The application handles:

Empty input
Invalid input length
Empty AI responses
Invalid JSON responses
Unexpected AI response structures
Backend/API failures
Loading states
Stale responses from previous requests

Zod validates the AI-generated response on the backend before it is returned to the frontend.

AI Usage

A real LLM is used through the Groq API.

The AI is instructed to return a specific JSON structure containing the topic, summary, flashcards and quiz questions.

The backend parses and validates the generated response before rendering it in the React application.

AI assistance was also used during development for implementation guidance, debugging and improving the application structure.

Security

The Groq API key is stored in the server .env file.

The .env file is excluded from Git using .gitignore and is not included in the GitHub repository.

Limitations
AI-generated content may occasionally contain factual inaccuracies.
The quality of the generated study material depends on the provided topic or notes.
The application requires a valid Groq API key.
Generated content should be verified against authoritative study material when accuracy is important.
Original Work

StudySpark AI was developed as an internship assignment.

The application architecture, frontend interaction, backend integration, structured AI output handling and UI were implemented specifically for this project.

Time Spent

Approximately 7-8 hours including planning, development, debugging, testing and documentation.
require("dotenv").config();

const Groq = require("groq-sdk");
const { studyResultSchema } = require("./schema");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateStudyMaterial(userInput) {
  const prompt = `
You are an educational content generator for an AI study application.

The user provided the following topic or study notes:

"${userInput}"

Create a useful study set based on the user's input.

Return ONLY valid JSON.

The JSON must follow this exact structure:

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

Rules:

1. Generate exactly 5 flashcards.
2. Generate exactly 5 quiz questions.
3. Every quiz question must have exactly 4 options.
4. correctAnswer must be a zero-based index from 0 to 3.
5. The correct answer must actually match the option at correctAnswer.
6. Give a short explanation for every quiz answer.
7. Keep the content educational and concise.
8. Base the material on the user's topic or notes.
9. Do not use Markdown.
10. Do not use code fences.
11. Do not include any text outside the JSON object.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content:
          "You generate structured educational study material as valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,

    response_format: {
      type: "json_object",
    },
  });

  const rawText = completion.choices?.[0]?.message?.content;

  if (!rawText || !rawText.trim()) {
    throw new Error("EMPTY_AI_RESPONSE");
  }

  let parsed;

  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    throw new Error("INVALID_JSON");
  }

  const validation = studyResultSchema.safeParse(parsed);

  if (!validation.success) {
    console.error(
      "Zod validation error:",
      validation.error.flatten()
    );

    throw new Error("INVALID_RESPONSE_SHAPE");
  }

  return validation.data;
}

module.exports = {
  generateStudyMaterial,
};
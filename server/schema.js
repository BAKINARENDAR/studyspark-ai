const { z } = require("zod");

const flashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const quizQuestionSchema = z.object({
  question: z.string().min(1),

  options: z
    .array(z.string().min(1))
    .length(4),

  correctAnswer: z
    .number()
    .int()
    .min(0)
    .max(3),

  explanation: z.string().min(1),
});

const studyResultSchema = z.object({
  topic: z.string().min(1),

  summary: z.string().min(1),

  flashcards: z
    .array(flashcardSchema)
    .min(3)
    .max(10),

  quiz: z
    .array(quizQuestionSchema)
    .min(3)
    .max(10),
});

module.exports = {
  studyResultSchema,
};
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { generateStudyMaterial } = require("./generate");

const app = express();

app.use(cors());
app.use(express.json());


// -------------------------
// Health Check
// -------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "StudySpark API is running",
  });
});


// -------------------------
// Generate Study Material
// -------------------------

app.post("/api/generate", async (req, res) => {
  try {
    const { input } = req.body;

    // Validate request
    if (!input || typeof input !== "string") {
      return res.status(400).json({
        success: false,
        error: "Input is required.",
      });
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Please provide at least 5 characters.",
      });
    }

    if (trimmedInput.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Input must be 2000 characters or less.",
      });
    }


    // Call Groq
    const result = await generateStudyMaterial(
      trimmedInput
    );


    // Send validated data to frontend
    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Generation error:", error);


    // AI returned nothing
    if (error.message === "EMPTY_AI_RESPONSE") {
      return res.status(502).json({
        success: false,
        error: "The AI returned an empty response.",
      });
    }


    // AI returned invalid JSON
    if (error.message === "INVALID_JSON") {
      return res.status(502).json({
        success: false,
        error: "The AI returned invalid JSON.",
      });
    }


    // AI returned incorrect structure
    if (error.message === "INVALID_RESPONSE_SHAPE") {
      return res.status(502).json({
        success: false,
        error: "The AI response had an unexpected structure.",
      });
    }


    // Other errors
    return res.status(500).json({
      success: false,
      error: "Failed to generate study material.",
    });
  }
});


// -------------------------
// Start Server
// -------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `StudySpark server running on port ${PORT}`
  );
});
const API_BASE_URL = "http://localhost:5000";

export async function generateStudyMaterial(input) {
  const response = await fetch(
    `${API_BASE_URL}/api/generate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        input,
      }),
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      result.error ||
        "Failed to generate study material."
    );
  }

  if (!result.success || !result.data) {
    throw new Error(
      "The server returned an unexpected response."
    );
  }

  return result.data;
}
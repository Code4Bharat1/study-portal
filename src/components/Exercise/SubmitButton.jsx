const submitExercise = async ({
  userId,
  level,
  passedTestCases,
  totalTestCases,
}) => {
  try {
    const response = await fetch("https://sp-api.code4bharat.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        level,
        passedTestCases,
        totalTestCases,
      }),
    });

    const data = await response.json();
    console.log("Score updated:", data);
  } catch (error) {
    console.error("Submit error:", error);
  }
};

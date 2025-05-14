"use client";
import { useState } from "react";

const GeminiPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://sp-api.code4bharat.com/api/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.text || "No response from Gemini.");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get response from Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Ask Gemini AI
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question here..."
            className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 resize-none min-h-[100px]"
          />

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-200 ${
              loading || !prompt.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Thinking..." : "Ask Gemini"}
          </button>
        </form>

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Gemini's Response:
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiPage;

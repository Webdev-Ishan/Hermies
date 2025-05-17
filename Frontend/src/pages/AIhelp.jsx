import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AIhelp = () => {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const url = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let Response = await axios.post(
        `${url}/api/ai/response`,
        {
          prompt,
        },
        { withCredentials: true }
      );

      console.log(Response.data);
      if (Response.data && Response.data.success) {
        setSuggestion(Response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatSuggestion = (text) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2 text-white">
        {line}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl border-2 border-yellow-500">
        <h2 className="text-2xl font-bold text-center mb-6">
          Ask Hermies for the Perfect Pet!
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 text-white bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your ideal pet..."
            rows="4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 border-2 border-black text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Get Suggestion
          </button>
        </form>

        {suggestion && (
          <div className="mt-6 bg-black p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">
              Hermies Suggests:
            </h3>
            <div className="text-white">{formatSuggestion(suggestion)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIhelp;

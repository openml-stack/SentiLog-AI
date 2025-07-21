import React, { useState } from "react";
import SentimentCard from "./SentimentCard";
import { Link } from "react-router-dom";
import api from "../axios";

const QuickActions = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.post("/api/news/analyze", { text });
      setResult(res.data);
    } catch (err) {
      setError("Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Quick Sentiment Analyzer</h2>
        <textarea
          className="border p-2 rounded w-full min-h-[80px] resize-y"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste some text or article here..."
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <Link to="/journal" className="px-4 py-2 bg-green-600 text-white rounded">Log a Mood Entry</Link>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {result ? (
          <SentimentCard sentiment={result.sentiment} emotion={result.emotion} />
        ) : (
          <div className="text-gray-400 italic text-center">Sentiment and emotion will appear here.</div>
        )}
      </div>
    </section>
  );
};

export default QuickActions; 
import React, { useState } from "react";
import TextInput from "../components/TextInput";
import SentimentCard from "../components/SentimentCard";
import api from "../axios";

const NewsPage = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">News Article Sentiment Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <TextInput
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste news article text here..."
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {result && <SentimentCard sentiment={result.sentiment} emotion={result.emotion} />}
    </div>
  );
};

export default NewsPage; 
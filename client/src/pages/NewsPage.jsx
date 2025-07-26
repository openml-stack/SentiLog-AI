import React, { useContext, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import SentimentCard from "../components/SentimentCard";
import api from "../axios";
import {ThemeContext} from '../App'

const NewsPage = () => {
  const theme=useContext(ThemeContext)
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // tab title
      useEffect(()=>{
         document.title='SentiLogAI-News '
      },[])

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
    <div className="p-4 max-w-2xl mx-auto mt-12 rounded-xl">
      <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move">News Article Sentiment Analysis</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <TextInput
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste news article text here..."
        />
        <button className={`bg-gradient-to-r from-sky-600/65 via-purple-600/70 to-pink-600/70 mt-2 px-4 py-2 rounded text-slate-300`} type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {result && <SentimentCard sentiment={result.sentiment} emotion={result.emotion} />}
    </div>
  );
};

export default NewsPage; 
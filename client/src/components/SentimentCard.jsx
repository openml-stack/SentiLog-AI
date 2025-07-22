import React from "react";

const SentimentCard = ({ sentiment, emotion }) => (
  <div className="border rounded p-4 shadow">
    <div>Sentiment: {sentiment}</div>
    <div>Emotion: {emotion}</div>
  </div>
);

export default SentimentCard; 
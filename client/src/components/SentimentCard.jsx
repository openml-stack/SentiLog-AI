import React from "react";

const SentimentCard = ({ sentiment, emotion }) => {
  let bgColor = "bg-white/20"; // Default for Neutral
  let borderColor = "border-gray-300";

  if (sentiment === "POSITIVE") {
    bgColor = "bg-green-300/30";
    borderColor = "border-green-400/50";
  }
  if (sentiment === "NEGATIVE") {
    bgColor = "bg-red-300/30";
    borderColor = "border-red-400/50";
  }

  return (
    <div
      className={`backdrop-blur-md ${bgColor} ${borderColor} border rounded-2xl max-w-xl p-6 shadow-xl`}
    >
      <div className="text-lg font-semibold text-gray-800">
        Sentiment: {sentiment}
      </div>
      <div className="text-base text-gray-700 mt-2">Emotion: {emotion}</div>
    </div>
  );
};


export default SentimentCard
import React from "react";

const SentimentCard = ({ sentiment, emotion }) => {
  let bgColor = "bg-white/20 dark:bg-white/5"; 
  let borderColor = "border-gray-300 dark:border-white/10";
  let textColor = "text-gray-800 dark:text-gray-100";

  if (sentiment === "POSITIVE") {
    bgColor = "bg-green-300/30 dark:bg-emerald-400/10";
    borderColor = "border-green-400/50 dark:border-emerald-400/30";
    textColor = "text-green-800 dark:text-emerald-300";
  } else if (sentiment === "NEGATIVE") {
    bgColor = "bg-red-300/30 dark:bg-red-400/10";
    borderColor = "border-red-400/50 dark:border-red-400/30";
    textColor = "text-red-800 dark:text-red-300";
  }

  return (
    <div
      className={`backdrop-blur-md ${bgColor} ${borderColor} border rounded-2xl max-w-xl p-6 shadow-xl transition-all duration-300`}
    >
      <div className={`text-lg font-semibold ${textColor}`}>
        Sentiment: {sentiment}
      </div>
      <div className="text-base text-gray-700 dark:text-gray-300 mt-2">
        Emotion: {emotion}
      </div>
    </div>
  );
};

export default SentimentCard;

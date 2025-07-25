import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  File,
  AlertCircle,
  CheckCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Eye,
} from "lucide-react";
import api from "../axios";
import Navbar from "../components/Navbar.jsx"

const AnalyzePage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setError("");
    setUploadedFile(file);
    setIsExtracting(true);
    setSentimentResult(null);
    setExtractedText("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      setExtractedText(data.extractedText);
      setSentimentResult(data.sentiment || data.detailedAnalysis);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || "Failed to analyze file.";
      setError(message);
    }
    setIsExtracting(false);
  };
  const themeColors = {
  light: {
    '--bg': '#ffffff',
    '--card-bg': '#f9fafb',
    '--border': '#e5e7eb',
    '--heading': '#111827',
    '--body-text': '#374151',
    '--button': '#6366f1',
    '--button-hover': '#4f46e5',
    '--gradient-from': '#6366f1',
    '--gradient-to': '#d946ef',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',
    '--icon': '#6b7280',
    '--link': '#3b82f6',
    '--link-hover': '#1d4ed8',
  },
  dark: {
    '--bg': '#0b1120',
    '--card-bg': '#111827',
    '--border': '#1f2937',
    '--heading': '#f3f4f6',
    '--body-text': '#d1d5db',
    '--button': '#6366f1',
    '--button-hover': '#4f46e5',
    '--gradient-from': '#6366f1',
    '--gradient-to': '#d946ef',
    '--input-bg': '#1a2332',
    '--input-border': '#334155',
    '--icon': '#94a3b8',
    '--link': '#60a5fa',
    '--link-hover': '#3b82f6',
  }
};


  const downloadResults = () => {
    if (!sentimentResult || !uploadedFile) return;

    const results = {
      fileName: uploadedFile.name,
      analysisDate: new Date().toISOString(),
      sentiment: sentimentResult.sentiment,
      score: sentimentResult.score,
      confidence: sentimentResult.confidence,
      statistics: {
        wordCount: sentimentResult.wordCount,
        sentenceCount: sentimentResult.sentenceCount,
        positiveWords: sentimentResult.positiveWords,
        negativeWords: sentimentResult.negativeWords,
        sentimentWordsFound: sentimentResult.sentimentWordsFound,
        averageWordsPerSentence: sentimentResult.averageWordsPerSentence,
      },
      detailedAnalysis: sentimentResult.detailedAnalysis,
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentiment-analysis-${uploadedFile.name.replace(
      /\.[^/.]+$/,
      ""
    )}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200";
      case "negative":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        <div className="text-center mb-12">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Advanced Document Sentiment Analysis
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Upload your documents to extract raw text and perform comprehensive
            sentiment analysis using advanced AI processing. Supports TXT, PDF,
            and DOCX files with detailed emotional sentiment scoring.
          </p>
        </div>

        {/* Upload Section */}
        <div
          data-aos="fade-down"
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    File Ready for Analysis
                  </h3>
                  <p className="text-lg text-blue-600 font-medium">
                    {uploadedFile.name}
                  </p>
                  <p className="text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setExtractedText("");
                    setSentimentResult(null);
                    setError("");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Upload Different File
                </button>
              </div>
            ) : (
              <>
                <Upload
                  className={`w-16 h-16 mx-auto mb-4 ${
                    dragActive ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Upload Document for Analysis
                </h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your file here, or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileInput}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Choose File
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: .txt, .pdf, .docx (Max size: 10MB)
                </p>
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Text Extraction Loading */}
        {isExtracting && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Processing Document...
              </h3>
              <p className="text-gray-600">
                Extracting text and analyzing sentiment for {uploadedFile?.name}
              </p>
            </div>
          </div>
        )}

        {/* Extracted Text Display */}
        {extractedText && !isExtracting && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileText className="w-6 h-6 text-blue-500 mr-2" />
                Extracted Raw Text
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showFullText ? "Show Less" : "Show Full Text"}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <div className="text-sm text-gray-600 mb-4">
                Extracted {extractedText.split(/\s+/).length} words from{" "}
                {uploadedFile?.name}
              </div>
              <div className={showFullText ? "" : "max-h-64 overflow-y-auto"}>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {showFullText
                    ? extractedText
                    : extractedText.length > 1000
                    ? extractedText.substring(0, 1000) +
                      '...\n\n[Click "Show Full Text" to see complete content]'
                    : extractedText}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Sentiment Results */}
        {sentimentResult && !isExtracting && (
          <div ref={resultRef} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
                Comprehensive Sentiment Analysis Results
              </h3>
              <button
                onClick={downloadResults}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Results
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Overall Sentiment */}
              <div className="lg:col-span-1">
                <div
                  className={`p-6 rounded-xl border-2 ${getSentimentColor(
                    sentimentResult.sentiment
                  )}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">
                      Overall Sentiment
                    </span>
                    {getSentimentIcon(sentimentResult.sentiment)}
                  </div>
                  <div
                    className={`text-3xl font-bold capitalize mb-2 ${
                      getSentimentColor(sentimentResult.sentiment).split(" ")[0]
                    }`}
                  >
                    {sentimentResult.sentiment}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-medium">
                        {sentimentResult.score}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium">
                        {sentimentResult.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Statistics */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-4">
                      Document Statistics
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Words:</span>
                        <span className="font-medium">
                          {sentimentResult.wordCount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sentences:</span>
                        <span className="font-medium">
                          {sentimentResult.sentenceCount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Avg Words/Sentence:
                        </span>
                        <span className="font-medium">
                          {sentimentResult.averageWordsPerSentence}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Text Length:</span>
                        <span className="font-medium">
                          {sentimentResult.detailedAnalysis?.textLength?.toLocaleString()}{" "}
                          chars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-4">
                      Sentiment Indicators
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-600">Positive Terms:</span>
                        <span className="font-medium text-green-600">
                          {sentimentResult.positiveWords}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-600">Negative Terms:</span>
                        <span className="font-medium text-red-600">
                          {sentimentResult.negativeWords}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Total Sentiment Words:
                        </span>
                        <span className="font-medium">
                          {sentimentResult.sentimentWordsFound}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Sentiment Density:
                        </span>
                        <span className="font-medium">
                          {(
                            (sentimentResult.sentimentWordsFound /
                              sentimentResult.wordCount) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown Visualization */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-6">
                Sentiment Distribution
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-600 font-medium">
                      Positive Sentiment
                    </span>
                    <span className="text-sm font-medium">
                      {sentimentResult.positiveWords > 0
                        ? Math.round(
                            (sentimentResult.positiveWords /
                              (sentimentResult.positiveWords +
                                sentimentResult.negativeWords)) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          sentimentResult.positiveWords > 0
                            ? (sentimentResult.positiveWords /
                                (sentimentResult.positiveWords +
                                  sentimentResult.negativeWords)) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-red-600 font-medium">
                      Negative Sentiment
                    </span>
                    <span className="text-sm font-medium">
                      {sentimentResult.negativeWords > 0
                        ? Math.round(
                            (sentimentResult.negativeWords /
                              (sentimentResult.positiveWords +
                                sentimentResult.negativeWords)) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          sentimentResult.negativeWords > 0
                            ? (sentimentResult.negativeWords /
                                (sentimentResult.positiveWords +
                                  sentimentResult.negativeWords)) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Summary */}
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-4">
                Detailed Analysis Summary
              </h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                The document <strong>"{uploadedFile?.name}"</strong> exhibits a
                <strong
                  className={`${
                    sentimentResult.sentiment === "positive"
                      ? "text-green-600"
                      : sentimentResult.sentiment === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {" "}
                  {sentimentResult.sentiment}
                </strong>{" "}
                overall sentiment with a confidence level of
                <strong> {sentimentResult.confidence}%</strong>. The analysis
                processed
                <strong>
                  {" "}
                  {sentimentResult.wordCount?.toLocaleString()} words
                </strong>{" "}
                across
                <strong> {sentimentResult.sentenceCount} sentences</strong>,
                identifying
                <strong> {sentimentResult.positiveWords} positive</strong> and
                <strong> {sentimentResult.negativeWords} negative</strong>{" "}
                sentiment indicators. The sentiment density is
                <strong>
                  {" "}
                  {(
                    (sentimentResult.sentimentWordsFound /
                      sentimentResult.wordCount) *
                    100
                  ).toFixed(1)}
                  %
                </strong>
                , with an average of
                <strong>
                  {" "}
                  {sentimentResult.averageWordsPerSentence} words per sentence
                </strong>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;

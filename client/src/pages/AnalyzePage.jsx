import React, { useState, useRef, useContext, useEffect } from "react";
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
import Navbar from "../components/Navbar.jsx";
import { ThemeContext } from "../context/ThemeContext";

const AnalyzePage = () => {
  const { theme } = useContext(ThemeContext);
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


  useEffect(() => {
  import('aos').then(AOS => {
    AOS.init({
      duration: 600,
      once: false,
    });
    AOS.refreshHard();
  });
}, [theme]);


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
    if (theme === 'dark') {
      switch (sentiment) {
        case "positive":
          return "text-green-400 bg-green-900/30 border-green-700";
        case "negative":
          return "text-red-400 bg-red-900/30 border-red-700";
        default:
          return "text-gray-400 bg-gray-800 border-gray-600";
      }
    } else {
      switch (sentiment) {
        case "positive":
          return "text-green-600 bg-green-50 border-green-200";
        case "negative":
          return "text-red-600 bg-red-50 border-red-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-blue-400 to-purple-400' 
              : 'from-blue-600 to-purple-600'
          } bg-clip-text text-transparent mb-4`}>
            Advanced Document Sentiment Analysis
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Upload your documents to extract raw text and perform comprehensive
            sentiment analysis using advanced AI processing. Supports TXT, PDF,
            and DOCX files with detailed emotional sentiment scoring.
          </p>
        </div>

        {/* Upload Section */}
        <div
          data-aos="fade-down"
          className={`rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? theme === 'dark'
                  ? "border-blue-400 bg-blue-900/20"
                  : "border-blue-500 bg-blue-50"
                : theme === 'dark'
                  ? "border-gray-600 hover:border-blue-500 hover:bg-gray-700/50"
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
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    File Ready for Analysis
                  </h3>
                  <p className="text-lg text-blue-600 font-medium">
                    {uploadedFile.name}
                  </p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
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
                  className={`font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  Upload Different File
                </button>
              </div>
            ) : (
              <>
                <Upload
                  className={`w-16 h-16 mx-auto mb-4 ${
                    dragActive 
                      ? "text-blue-500" 
                      : theme === 'dark' ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Upload Document for Analysis
                </h3>
                <p className={`mb-6 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
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
                <p className={`text-sm mt-4 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Supported formats: .txt, .pdf, .docx (Max size: 10MB)
                </p>
              </>
            )}
          </div>

          {error && (
            <div className={`mt-6 p-4 rounded-lg flex items-center border ${
              theme === 'dark' 
                ? 'bg-red-900/30 border-red-700' 
                : 'bg-red-50 border-red-200'
            }`}>
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <p className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}>{error}</p>
            </div>
          )}
        </div>

        {/* Text Extraction Loading */}
        {isExtracting && (
          <div className={`rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Processing Document...
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Extracting text and analyzing sentiment for {uploadedFile?.name}
              </p>
            </div>
          </div>
        )}

        {/* Extracted Text Display */}
        {extractedText && !isExtracting && (
          <div className={`rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                <FileText className="w-6 h-6 text-blue-500 mr-2" />
                Extracted Raw Text
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-blue-400 hover:text-blue-300 border-blue-600 hover:bg-blue-900/20'
                      : 'text-blue-600 hover:text-blue-800 border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showFullText ? "Show Less" : "Show Full Text"}
                </button>
              </div>
            </div>

            <div className={`rounded-lg p-6 border-2 ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-600' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Extracted {extractedText.split(/\s+/).length} words from{" "}
                {uploadedFile?.name}
              </div>
              <div className={showFullText ? "" : "max-h-64 overflow-y-auto"}>
                <pre className={`text-sm whitespace-pre-wrap font-mono leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
          <div ref={resultRef} className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-2xl font-bold flex items-center ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
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
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
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
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Score:</span>
                      <span className="font-medium">
                        {sentimentResult.score}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Confidence:</span>
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
                  <div className={`p-6 rounded-xl border-2 ${
                    theme === 'dark' 
                      ? 'bg-blue-900/30 border-blue-700' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-800'
                    }`}>
                      Document Statistics
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Total Words:</span>
                        <span className="font-medium">
                          {sentimentResult.wordCount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sentences:</span>
                        <span className="font-medium">
                          {sentimentResult.sentenceCount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          Avg Words/Sentence:
                        </span>
                        <span className="font-medium">
                          {sentimentResult.averageWordsPerSentence}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Text Length:</span>
                        <span className="font-medium">
                          {sentimentResult.detailedAnalysis?.textLength?.toLocaleString()}{" "}
                          chars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border-2 ${
                    theme === 'dark' 
                      ? 'bg-purple-900/30 border-purple-700' 
                      : 'bg-purple-50 border-purple-200'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-800'
                    }`}>
                      Sentiment Indicators
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-500">Positive Terms:</span>
                        <span className="font-medium text-green-500">
                          {sentimentResult.positiveWords}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-500">Negative Terms:</span>
                        <span className="font-medium text-red-500">
                          {sentimentResult.negativeWords}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          Total Sentiment Words:
                        </span>
                        <span className="font-medium">
                          {sentimentResult.sentimentWordsFound}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
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
            <div className={`mt-8 p-6 rounded-xl border-2 ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-600' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-6 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Sentiment Distribution
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-500 font-medium">
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
                  <div className={`w-full rounded-full h-3 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
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
                    <span className="text-sm text-red-500 font-medium">
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
                  <div className={`w-full rounded-full h-3 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
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
            <div className={`mt-8 p-6 rounded-xl border-2 ${
              theme === 'dark' 
                ? 'bg-indigo-900/30 border-indigo-700' 
                : 'bg-indigo-50 border-indigo-200'
            }`}>
              <h4 className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-800'
              }`}>
                Detailed Analysis Summary
              </h4>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
              }`}>
                The document <strong>"{uploadedFile?.name}"</strong> exhibits a
                <strong
                  className={`${
                    sentimentResult.sentiment === "positive"
                      ? "text-green-500"
                      : sentimentResult.sentiment === "negative"
                      ? "text-red-500"
                      : theme === 'dark' ? "text-gray-400" : "text-gray-600"
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
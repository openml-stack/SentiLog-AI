import React, { useState, useRef } from 'react';
import { Upload, FileText, File, AlertCircle, CheckCircle, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import * as mammoth from 'mammoth';
import Navbar from '../components/Navbar';

const AnalyzePage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
    setError('');
    setUploadedFile(null);
    setExtractedText('');
    setSentimentResult(null);

    // Validate file type
    const validTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const isValidFile = validTypes.includes(file.type) || ['txt', 'pdf', 'docx'].includes(fileExtension);

    if (!isValidFile) {
      setError('Please upload a .txt, .pdf, or .docx file.');
      return;
    }

    setUploadedFile(file);

    try {
      let text = '';

      if (file.type === 'text/plain' || fileExtension === 'txt') {
        text = await file.text();
      } else if (file.type === 'application/pdf' || fileExtension === 'pdf') {
        // For demo purposes, we'll simulate PDF text extraction
        text = `[PDF Content Extracted from ${file.name}]\n\nThis is a simulated extraction of PDF content. In a real implementation, you would use a PDF parsing library like pdf-parse or PDF.js to extract the actual text content from the PDF file. The sentiment analysis would then be performed on this extracted text.`;
      } else if (fileExtension === 'docx') {
        // Extract text from DOCX using mammoth
        const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        text = result.value;
      }

      if (!text.trim()) {
        setError('No text content found in the uploaded file.');
        return;
      }

      setExtractedText(text);
      await performSentimentAnalysis(text);

    } catch (err) {
      setError('Error processing file: ' + err.message);
    }
  };

  const performSentimentAnalysis = async (text) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Mock sentiment analysis - in real app, this would call your sentiment API
      const words = text.toLowerCase().split(/\s+/);
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'happy', 'joy', 'success', 'brilliant', 'perfect', 'outstanding'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'frustrated', 'disappointed', 'horrible', 'disgusting', 'failure', 'worst'];

      let positiveCount = 0;
      let negativeCount = 0;

      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });

      const totalSentimentWords = positiveCount + negativeCount;
      let sentiment = 'neutral';
      let score = 0;
      let confidence = 0.5;

      if (totalSentimentWords > 0) {
        score = (positiveCount - negativeCount) / totalSentimentWords;
        confidence = Math.min(0.95, 0.5 + (totalSentimentWords / words.length) * 2);
        
        if (score > 0.2) sentiment = 'positive';
        else if (score < -0.2) sentiment = 'negative';
      }

      setSentimentResult({
  sentiment,
  score: Math.round(score * 100) / 100,
  confidence: Math.round(confidence * 100),
  wordCount: words.length,
  positiveWords: positiveCount,
  negativeWords: negativeCount,
  sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
});

setTimeout(() => {
  resultRef.current?.scrollIntoView({ behavior: 'smooth' });
}, 300); // Slight delay to ensure result is rendered


    } catch (err) {
      setError('Error analyzing sentiment: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Document Sentiment Analysis
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload your text, PDF, or Word documents to extract content and analyze emotional sentiment using advanced AI processing.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-2 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile && (
  <p className="text-sm text-gray-700 font-medium mb-4">
    Selected: <span className="text-blue-600">{uploadedFile.name}</span>
  </p>
)}

            <Upload className={`w-16 h-16 mx-auto mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: .txt, .pdf, .docx (Max size: 10MB)
            </p>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* File Info */}
        {uploadedFile && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center mb-4">
              {uploadedFile.name.endsWith('.pdf') ? (
                <File className="w-8 h-8 text-red-500 mr-3" />
              ) : (
                <FileText className="w-8 h-8 text-blue-500 mr-3" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{uploadedFile.name}</h3>
                <p className="text-gray-600">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
            </div>
          </div>
        )}

        {/* Extracted Text */}
        {extractedText && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-2" />
              Extracted Text
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {extractedText.length > 1000 
                  ? extractedText.substring(0, 1000) + '...\n\n[Text truncated for display]'
                  : extractedText
                }
              </pre>
            </div>
          </div>
        )}

        {/* Analysis Loading */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Sentiment...</h3>
              <p className="text-gray-600">Processing your document with AI-powered sentiment analysis</p>
            </div>
          </div>
        )}

        {/* Sentiment Results */}
        {sentimentResult && (
  <div ref={resultRef} className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
              Sentiment Analysis Results
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Sentiment */}
              <div className="space-y-6">
                <div className={`p-6 rounded-xl border-2 ${
                  sentimentResult.sentiment === 'positive' 
                    ? 'border-green-200 bg-green-50' 
                    : sentimentResult.sentiment === 'negative'
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Overall Sentiment</span>
                    {getSentimentIcon(sentimentResult.sentiment)}
                  </div>
                  <div className={`text-2xl font-bold capitalize ${getSentimentColor(sentimentResult.sentiment).split(' ')[0]}`}>
                    {sentimentResult.sentiment}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Score: {sentimentResult.score} | Confidence: {sentimentResult.confidence}%
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Document Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Words:</span>
                      <span className="font-medium">{sentimentResult.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sentences:</span>
                      <span className="font-medium">{sentimentResult.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Positive Words:</span>
                      <span className="font-medium text-green-600">{sentimentResult.positiveWords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Negative Words:</span>
                      <span className="font-medium text-red-600">{sentimentResult.negativeWords}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="space-y-6">
                <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-4">Sentiment Breakdown</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-green-600 font-medium">Positive</span>
                        <span className="text-sm font-medium">{Math.round((sentimentResult.positiveWords / (sentimentResult.positiveWords + sentimentResult.negativeWords || 1)) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{width: `${(sentimentResult.positiveWords / (sentimentResult.positiveWords + sentimentResult.negativeWords || 1)) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-red-600 font-medium">Negative</span>
                        <span className="text-sm font-medium">{Math.round((sentimentResult.negativeWords / (sentimentResult.positiveWords + sentimentResult.negativeWords || 1)) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                          style={{width: `${(sentimentResult.negativeWords / (sentimentResult.positiveWords + sentimentResult.negativeWords || 1)) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Analysis Summary</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The document shows a <strong className={sentimentResult.sentiment === 'positive' ? 'text-green-600' : sentimentResult.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'}>
                      {sentimentResult.sentiment}
                    </strong> overall sentiment with a confidence level of {sentimentResult.confidence}%. 
                    The analysis identified {sentimentResult.positiveWords} positive and {sentimentResult.negativeWords} negative sentiment indicators 
                    across {sentimentResult.wordCount} words in {sentimentResult.sentences} sentences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
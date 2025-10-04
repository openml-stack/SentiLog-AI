import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Filter, Calendar, TrendingUp, TrendingDown, Minus, ExternalLink, Newspaper, Search, RefreshCw, X, Clock, User } from 'lucide-react'; 
import BackToTopButton from '../components/BackToTop';
import api from '../axios'; // Assuming this is your configured Axios instance
import toast, { Toaster } from 'react-hot-toast';

const NewsListingPage = () => {
    const { theme } = useContext(ThemeContext);
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedSentiment, setSelectedSentiment] = useState('Neutral');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [articleContentLoading, setArticleContentLoading] = useState(false); 

    // AOS initialization with theme support
    useEffect(() => {
        import('aos').then(AOS => {
            AOS.init({ duration: 600, once: false });
            AOS.refreshHard();
        });
    }, [theme]);
    
    // Fetch initial news list on component mount
    useEffect(() => {
        fetchNews();
    }, []);

    // Re-filter news whenever the list, selected sentiment, or search term changes
    useEffect(() => {
        filterNews();
    }, [news, selectedSentiment, searchTerm]);

    // =================================================================
    // API CALLS & CORE LOGIC
    // =================================================================

    /**
     * Fetches the main list of news articles from the backend API.
     */
    const fetchNews = async () => {
        try {
            setLoading(true);
            setError(null);

            // API Call 1: Fetch News List using the confirmed /api/news endpoint
            const response = await api.get('/api/news'); 
            const fetchedNews = response.data; 
            
            // Deduplication logic (useful if the API occasionally sends duplicates)
            const uniqueNewsMap = new Map();
            fetchedNews.forEach(article => {
                // Use a reliable unique key like 'id' or 'url'
                uniqueNewsMap.set(article.id || article.url, article); 
            });
            const uniqueNews = Array.from(uniqueNewsMap.values());
            
            setNews(uniqueNews); 
            toast.success('Daily news loaded successfully from API!');
        } catch (err) {
            const msg = 'Failed to fetch daily news. Please ensure your backend is running on port 8080 and the /api/news route is implemented.';
            setError(msg);
            toast.error('Failed to load news articles from API');
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Enhanced logic to create a proper paragraph-based brief (preview) 
     * and removes the [+][N] chars string.
     */
    const openArticleModal = async (article) => {
        
        // Function to split and format the preview content
        const createPreviewContent = (rawText) => {
            if (!rawText || rawText.trim().length < 50) { 
                return `<p class="leading-relaxed">Article content preview is short or unavailable. Please click the "Go to Original Article" button below to read the full story.</p>`;
            }

            // 1. Detect and remove the extraneous character count marker (e.g., "[+2239 chars]") from the raw text.
            let cleanText = rawText.replace(/\[\+\d+ chars\]\s*$/, '').trim(); 
            
            if (cleanText.length < 50) {
                return `<p class="leading-relaxed">Article content preview is short or unavailable. Please click the "Go to Original Article" button below to read the full story.</p>`;
            }


            // 2. Attempt to split by standard paragraph separators (\n\n or \n).
            const splitContent = cleanText.split(/\r?\n\s*\r?\n|\r?\n/).map(p => p.trim()).filter(p => p.length > 50);

            let previewParagraphs = [];
            let totalCharacterCount = 0;
            const MAX_PARAGRAPHS = 3; 
            const MAX_CHARS = 800; // Increased max char count for a more substantial brief

            // 3. Iterate to grab a maximum of MAX_PARAGRAPHS or up to MAX_CHARS
            for (let i = 0; i < splitContent.length && i < MAX_PARAGRAPHS; i++) {
                const paragraph = splitContent[i];
                
                if (totalCharacterCount > 0 && totalCharacterCount + paragraph.length > MAX_CHARS) break; 
                
                previewParagraphs.push(paragraph);
                totalCharacterCount += paragraph.length;
            }

            // 4. FALLBACK: If paragraph splitting was not effective (e.g., all one long string)
            if (previewParagraphs.length === 0) {
                 if (cleanText.length > 300) {
                     let rawChunk = cleanText.substring(0, MAX_CHARS).trim();
                     let lastSentenceEnd = Math.max(
                         rawChunk.lastIndexOf('.'), 
                         rawChunk.lastIndexOf('!'), 
                         rawChunk.lastIndexOf('?')
                     );

                     if (lastSentenceEnd > 100) {
                         rawChunk = rawChunk.substring(0, lastSentenceEnd + 1).trim();
                     }

                     previewParagraphs.push(rawChunk);
                 } else {
                     previewParagraphs.push(cleanText.trim());
                 }
            }


            // 5. Format and join the selected paragraphs into HTML.
            let htmlContent = previewParagraphs.map(p => `<p class="leading-relaxed mb-4">${p}</p>`).join('');

            // 6. Add a notification about truncation.
            const previewLength = previewParagraphs.join(' ').length;
            
            if (rawText.length > previewLength + 200 || rawText.includes('chars]')) { 
                 htmlContent += `<p class="text-sm mt-6 italic opacity-80">Full content is available on the original site.</p>`;
            } else if (cleanText.length > 0) {
                 htmlContent += `<p class="text-sm mt-6 italic opacity-80">Source summary displayed.</p>`;
            }

            return htmlContent;
        };
        // End of createPreviewContent
        
        // Determine the text source for initial preview
        const initialRawText = article.text || article.description;
        const initialContent = createPreviewContent(initialRawText);

        // Use 'date' if available, otherwise fallback to 'publishedAt'
        const publishedDate = article.date || article.publishedAt;

        // 2. Set basic article metadata and initial content
        setSelectedArticle({
            ...article,
            content: initialContent, 
            author: article.author || article.source || 'Unknown Author', 
            readTime: article.readTime || '5 min read', 
            tags: article.tags || (article.category ? [article.category] : []), 
            confidence: article.confidence ?? 0, 
            publishedAt: publishedDate, 
        }); 
        setIsModalOpen(true);
        
        // 3. Attempt to fetch full content (scraping) only if the article has an 'id'
        if (article.id) {
            setArticleContentLoading(true);
            try {
                // API Call 2: Fetch specific article content using ID (assuming backend route /api/news/:id)
                const response = await api.get(`/api/news/${article.id}`); 
                const fullArticle = response.data;

                // **CRUCIAL FIX:** Force the use of fullArticle.content if it exists.
                const newContent = fullArticle.content 
                    ? fullArticle.content 
                    : initialContent; 

                // Update the state with the full content, preserving existing metadata
                setSelectedArticle(prev => ({
                    ...prev,
                    content: newContent, 
                    author: fullArticle.author || prev.author, 
                    readTime: fullArticle.readTime || prev.readTime,
                    tags: fullArticle.tags || prev.tags,
                    confidence: fullArticle.confidence ?? prev.confidence, 
                }));
                
            } catch (err) {
                console.error('Error fetching full article content:', err);
                toast.error('Failed to load full article content. Displaying brief.');
            } finally {
                setArticleContentLoading(false);
            }
        } 
    };

    const closeArticleModal = () => {
        setIsModalOpen(false);
        // Clear selectedArticle after the transition for clean unmounting
        setTimeout(() => {
            setSelectedArticle(null);
            // Ensure loading state is reset when closing
            setArticleContentLoading(false); 
        }, 300); 
    };

    // =================================================================
    // UI LOGIC & HELPERS
    // =================================================================

    const filterNews = () => {
        let filtered = news.filter(article => article.sentiment === selectedSentiment);
        
        if (searchTerm) {
            filtered = filtered.filter(article =>
                // Nullish coalescing for Type Error fix
                (article.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (article.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (article.category ?? '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredNews(filtered);
    };

    const getSentimentCount = (sentiment) => {
        let articles = news;
        
        if (searchTerm) {
            articles = articles.filter(article =>
                (article.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (article.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (article.category ?? '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return articles.filter(article => article.sentiment === sentiment).length;
    };

    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'Positive':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'Negative':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };

    const getSentimentBadge = (sentiment, confidence) => {
        let percentageDisplay = 'N/A';
        
        // Check if confidence is a valid finite number and is greater than a very small threshold
        if (isFinite(confidence) && confidence >= 0.005) { 
            percentageDisplay = `${Math.round(confidence * 100)}%`;
        } else if (isFinite(confidence) && confidence === 0) {
             // If API explicitly sends 0, show 0%
             percentageDisplay = '0%'; 
        }
        
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1.5 transition-all duration-200";
        let colorClasses = "";
        
        switch (sentiment) {
            case 'Positive':
                colorClasses = theme === 'dark' 
                    ? "bg-green-900/60 text-green-300 border border-green-700/50" 
                    : "bg-green-100 text-green-800 border border-green-200";
                break;
            case 'Negative':
                colorClasses = theme === 'dark'
                    ? "bg-red-900/60 text-red-300 border border-red-700/50"
                    : "bg-red-100 text-red-800 border border-red-200";
                break;
            default:
                colorClasses = theme === 'dark'
                    ? "bg-gray-700/60 text-gray-300 border border-gray-600/50"
                    : "bg-gray-100 text-gray-800 border border-gray-200";
        }

        return (
            <span className={`${baseClasses} ${colorClasses}`}>
                {getSentimentIcon(sentiment)}
                {sentiment} ({percentageDisplay})
            </span>
        );
    };

    /**
     * Use article.date field (from MongoDB structure) or article.publishedAt
     */
    const formatDate = (dateString) => {
        try {
            // Handle null/undefined/empty string by falling back to current date
            const date = new Date(dateString || Date.now()); 
            
            // Check if the date object is valid
            if (isNaN(date.getTime())) {
                return 'Date Unavailable';
            }

            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return 'Date Unavailable';
        }
    };

    const refreshNews = () => {
        fetchNews();
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black'
                    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
            }`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Fetching data from API...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
                    theme === 'dark'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                        : 'bg-gradient-to-br from-blue-200 to-purple-200'
                }`}></div>
                <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
                    theme === 'dark'
                        ? 'bg-gradient-to-tr from-pink-600 to-yellow-600'
                        : 'bg-gradient-to-tr from-pink-200 to-yellow-200'
                }`}></div>
            </div>

            {/* Header */}
            <div className={`relative z-10 backdrop-blur-sm border-b transition-colors duration-300 ${
                theme === 'dark'
                    ? 'bg-gray-800/60 border-gray-700/50'
                    : 'bg-white/60 border-white/30'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div data-aos="fade-down" className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Newspaper className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Daily News Hub
                                </h1>
                                <p className={`text-lg mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    AI-powered sentiment analysis of today's headlines
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                                theme === 'dark' ? 'bg-gray-700/60 text-gray-300' : 'bg-white/80 text-gray-600'
                            }`}>
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {new Date().toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                            
                            <button
                                onClick={refreshNews}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Section */}
                <div data-aos="fade-up" className={`backdrop-blur-xl rounded-3xl p-6 shadow-xl border mb-8 transition-colors duration-300 ${
                    theme === 'dark'
                        ? 'bg-gray-800/60 border-gray-700/50'
                        : 'bg-white/60 border-white/30'
                }`}>
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                                type="text"
                                placeholder="Search news articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    theme === 'dark'
                                        ? 'bg-gray-700/60 border-gray-600/50 text-gray-100 placeholder-gray-400'
                                        : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                                }`}
                            />
                        </div>
                    </div>

                    {/* Sentiment Filters */}
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                        <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            Filter by Sentiment
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Positive', 'Neutral', 'Negative'].map((sentiment) => (
                            <button
                                key={sentiment}
                                onClick={() => setSelectedSentiment(sentiment)}
                                className={`p-4 rounded-xl border transition-all duration-200 transform hover:scale-105 ${
                                    selectedSentiment === sentiment
                                        ? theme === 'dark'
                                            ? 'border-blue-500 bg-blue-900/40 shadow-lg'
                                            : 'border-blue-500 bg-blue-50 shadow-lg'
                                        : theme === 'dark'
                                            ? 'border-gray-600/50 bg-gray-700/40 hover:bg-gray-700/60'
                                            : 'border-gray-200 bg-gray-50/80 hover:bg-gray-100/80'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getSentimentIcon(sentiment)}
                                        <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                                            {sentiment}
                                        </span>
                                    </div>
                                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {getSentimentCount(sentiment)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div data-aos="fade-up" className={`p-6 rounded-xl backdrop-blur-sm mb-8 ${
                        theme === 'dark'
                            ? 'bg-red-900/60 border border-red-700/50'
                            : 'bg-red-100/80 border border-red-200'
                    }`}>
                        <div className="flex items-center">
                            <div className="text-red-500 text-xl mr-3">⚠️</div>
                            <div>
                                <p className={`font-medium ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
                                    {error}
                                </p>
                                <button
                                    onClick={fetchNews}
                                    className={`mt-2 px-4 py-2 rounded-lg transition-colors ${
                                        theme === 'dark'
                                            ? 'bg-red-800 hover:bg-red-700 text-red-100'
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* News Articles */}
                <div data-aos="fade-up" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {selectedSentiment} News {searchTerm && `matching "${searchTerm}"`} ({filteredNews.length})
                        </h2>
                    </div>

                    {filteredNews.length === 0 ? (
                        <div className={`backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border transition-colors duration-300 ${
                            theme === 'dark'
                                ? 'bg-gray-800/60 border-gray-700/50'
                                : 'bg-white/60 border-white/30'
                        }`}>
                            <div className="text-6xl mb-4">📰</div>
                            <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                                No {selectedSentiment.toLowerCase()} news found
                                {searchTerm && ` for "${searchTerm}"`}
                            </h3>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                {searchTerm 
                                    ? 'Try adjusting your search terms or selecting a different sentiment filter.'
                                    : 'Try selecting a different sentiment filter to see more articles.'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredNews.map((article, index) => (
                                <div
                                    key={article.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className={`backdrop-blur-xl rounded-3xl shadow-xl border hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                                        theme === 'dark'
                                            ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80'
                                            : 'bg-white/60 border-white/80'
                                    }`}
                                >
                                    <div className="p-8">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    {/* Pass the article.confidence, which will be handled in the badge function */}
                                                    {getSentimentBadge(article.sentiment, article.confidence)} 
                                                    <span className={`text-xs uppercase tracking-wide font-medium px-2 py-1 rounded-full ${
                                                        theme === 'dark'
                                                            ? 'bg-gray-700/60 text-gray-300'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {article.category}
                                                    </span>
                                                </div>
                                                
                                                <h3 
                                                    onClick={() => openArticleModal(article)} // Added onClick to title
                                                    className={`text-2xl font-bold mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer ${
                                                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                                                    }`}>
                                                    {article.title}
                                                </h3>
                                                
                                                <p className={`text-lg leading-relaxed mb-6 ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                                }`}>
                                                    {/* Display the shorter description for the list view */}
                                                    {article.description}
                                                </p>
                                                
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    <div className={`flex items-center gap-4 text-sm ${
                                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        <span className="font-medium">{article.source}</span>
                                                        <span>•</span>
                                                        {/* Use publishedAt or date, depending on which exists in the main list data */}
                                                        <span>{formatDate(article.publishedAt || article.date)}</span>
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={() => openArticleModal(article)}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                                    >
                                                        View Full Article
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: theme === 'dark' ? '#374151' : '#ffffff',
                        color: theme === 'dark' ? '#f9fafb' : '#111827',
                    },
                }}
            />

            <BackToTopButton />

            {/* Article Modal Component */}
            {isModalOpen && selectedArticle && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeArticleModal} 
                >
                    <div 
                        className={`rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 transform ${
                            theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                        }`}
                        onClick={e => e.stopPropagation()} 
                    >
                        {/* Modal Header */}
                        <div className={`flex items-center justify-between p-6 border-b ${
                            theme === 'dark' 
                                ? 'border-gray-700 bg-gray-800' 
                                : 'border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'
                        }`}>
                            <div className="flex items-center gap-3">
                                {getSentimentBadge(selectedArticle.sentiment, selectedArticle.confidence)}
                                <span className={`text-xs uppercase tracking-wide font-medium px-2 py-1 rounded-full ${
                                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {selectedArticle.category}
                                </span>
                            </div>
                            <button
                                onClick={closeArticleModal}
                                className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                                <X className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                            </button>
                        </div>

                        {/* Modal Content - Added overflow-y-auto to the inner div to enable content scrolling */}
                        <div className="overflow-y-auto h-full max-h-[calc(90vh-77px)]"> 
                            <div className="p-8">
                                <h1 className="text-3xl font-bold mb-4 leading-tight">
                                    {selectedArticle.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                                    <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <User className="w-4 h-4" />
                                        <span>By **{selectedArticle.author}**</span> 
                                    </div>
                                    <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Clock className="w-4 h-4" />
                                        <span>{selectedArticle.readTime}</span> 
                                    </div>
                                    <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Calendar className="w-4 h-4" />
                                        <span>{formatDate(selectedArticle.publishedAt)}</span> 
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedArticle.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                theme === 'dark' 
                                                    ? 'bg-blue-900/40 text-blue-300' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Full Content / Loading State */}
                                {articleContentLoading ? (
                                    <div className="flex flex-col items-center justify-center min-h-[200px] py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Loading full article content...
                                        </p>
                                    </div>
                                ) : (
                                    <div 
                                        className={`prose max-w-none ${theme === 'dark' ? 'prose-invert text-gray-200' : 'text-gray-800'}`}
                                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                                    />
                                )}

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Originally published by <strong>{selectedArticle.source}</strong>
                                    </p>
                                    <div className="flex gap-4">
                                        <a 
                                            href={selectedArticle.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                                        >
                                            Go to Original Article <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button className={`px-6 py-2 rounded-xl transition-colors ${
                                            theme === 'dark' 
                                                ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}>
                                            Share Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsListingPage;
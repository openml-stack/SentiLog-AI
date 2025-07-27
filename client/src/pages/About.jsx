import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Brain, Users, Code, Globe, BookOpen, BarChart3, Zap, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import api from "../axios";
import Navbar from "../components/Navbar";


const SentiLogLanding = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqData = [
    {
      question: "What makes SentiLog AI different from other journaling apps?",
      answer: "SentiLog AI combines personal mood journaling with real-time news sentiment analysis, giving you insights into both your emotions and how current events might be influencing your mental state. It's powered by advanced AI models like Transformers and VADER for accurate emotion detection."
    },
    {
      question: "How accurate is the sentiment analysis?",
      answer: "Our AI uses state-of-the-art Transformer models and VADER sentiment analysis, which have been trained on millions of text samples. While no AI is 100% perfect, our system provides highly accurate sentiment and emotion detection that improves over time."
    },
    {
      question: "Is my personal journal data secure?",
      answer: "Absolutely. We use enterprise-grade security measures to protect your data. All journal entries are encrypted, and we never share your personal information. Being open-source, you can also review our security practices yourself."
    },
    {
      question: "Can I contribute to the development?",
      answer: "Yes! SentiLog AI is completely open-source. We welcome contributions from developers of all skill levels. Whether you want to add features, fix bugs, or improve documentation, check out our GitHub repository to get started."
    },
    {
      question: "What technologies power SentiLog AI?",
      answer: "Our tech stack includes React + Vite + Tailwind CSS for the frontend, Node.js + Express + MongoDB for the backend, and Python + Flask + Transformers for the AI service. Everything is designed to be modular and developer-friendly."
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Smart Journaling",
      description: "Write freely and get instant sentiment and emotion feedback on your entries with AI-powered analysis.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "News Analysis",
      description: "Paste headlines or articles and discover the emotional tone behind current events and stories.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Trend Tracking",
      description: "Visualize changes in your mood and world sentiment through beautiful, interactive charts over time.",
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Transparency",
      description: "Explore how modern ML models like Transformers and VADER work under the hood with clear explanations.",
      color: "from-green-500 to-yellow-500"
    }
  ];

  const howItWorksSteps = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Ideation",
      description: "Share your ideas and thoughts. Our AI analyzes the emotional foundation of your expressions.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Analysis",
      description: "The AI evaluates key emotional factors, mood trends, and potential influences to ensure accurate insights.",
      color: "from-purple-400 to-blue-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Strategy",
      description: "Get actionable insights and personalized recommendations to better understand and manage your emotional health.",
      color: "from-green-400 to-blue-500"
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                SentiLog AI
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-purple-400 transition-colors">About Us</a>
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
              <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
                      {mobileMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg p-4 mb-4">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="hover:text-purple-400 transition-colors">About Us</a>
                <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
                <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* About Us & Hero Section */}
      <section id="about" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* About Us Title with Typewriter Effect */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="inline-block animate-pulse bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
          </div>

          {/* SentiLog AI Introduction with Animated Text - MODIFIED */}
          <div className="mb-16 max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl font-bold mb-8 leading-tight"> {/* Changed h2 to p and adjusted text size */}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                SentiLog AI
              </span>
              <span className="text-white"> is a powerful, </span>
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                open-source platform
              </span>
            </p>
            
            <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed"> {/* Adjusted text size here */}
              <p className="transform hover:scale-105 transition-all duration-300 hover:text-white">
                that helps you understand emotions—both <span className="text-purple-400 font-semibold">your own</span> and <span className="text-cyan-400 font-semibold">the world's</span>.
              </p>
              
              <p className="transform hover:scale-105 transition-all duration-300 hover:text-white">
                By combining <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">personal mood journaling</span> with 
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold"> real-time news sentiment analysis</span>, 
                SentiLog AI gives you insights into how you feel and how current events might be influencing your mental state.
              </p>
              
              <p className="transform hover:scale-105 transition-all duration-300 hover:text-white">
                Whether you're writing a <span className="text-green-400 font-semibold">daily journal</span> or Browse the <span className="text-orange-400 font-semibold">latest news</span>, 
                our AI analyzes text in real-time to detect <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-semibold">mood, emotion, and sentiment trends</span>.
              </p>
              
              <p className="transform hover:scale-105 transition-all duration-300 hover:text-white text-lg md:text-xl font-semibold"> {/* Adjusted text size here */}
                It's designed to help you <span className="text-purple-400">reflect</span>, 
                <span className="text-cyan-400"> stay mindful</span>, and 
                <span className="text-green-400"> better understand</span> how the world affects your mindset.
              </p>
            </div>
          </div>

          {/* Interactive Dashboard Preview with Enhanced Effects */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl transform scale-110"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-md rounded-3xl p-8 max-w-5xl mx-auto border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
                  <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    SentiLog AI Dashboard
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all duration-300 transform hover:scale-110 hover:rotate-1">
                  <div className="text-sm text-purple-300 mb-2 group-hover:text-purple-200">Mood Score</div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">87%</div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-400" />
                    Positive trend
                  </div>
                </div>
                
                <div className="group bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-2xl border border-green-500/30 hover:border-green-400 transition-all duration-300 transform hover:scale-110 hover:-rotate-1">
                  <div className="text-sm text-green-300 mb-2 group-hover:text-green-200">Journal Entries</div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">24</div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-blue-400" />
                    This month
                  </div>
                </div>
                
                <div className="group bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-2xl border border-orange-500/30 hover:border-orange-400 transition-all duration-300 transform hover:scale-110 hover:rotate-1">
                  <div className="text-sm text-orange-300 mb-2 group-hover:text-orange-200">News Sentiment</div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">62%</div>
                  <div className="text-sm text-gray-400 flex items-center">
                    <Globe className="w-4 h-4 mr-1 text-yellow-400" />
                    Mixed emotions
                  </div>
                </div>
              </div>
              
              {/* Additional Interactive Elements */}
              <div className="mt-6 flex justify-center space-x-8">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                  <span className="text-sm">Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">AI-Powered Insights</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <span className="text-sm">Continuous Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🌍 What You Can Do with <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">SentiLog AI</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How it <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent italic">Works</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex-1 max-w-sm">
                <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🔧 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Modern Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for maximum performance and developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all">
              <Code className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Frontend</h3>
              <p className="text-gray-300 mb-4">React + Vite + Tailwind CSS for a fast, responsive UI experience</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Vite</span>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Tailwind</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all">
              <Globe className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Backend</h3>
              <p className="text-gray-300 mb-4">Node.js + Express + MongoDB to manage data and serve APIs</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Express</span>
                <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">MongoDB</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all">
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">AI Service</h3>
              <p className="text-gray-300 mb-4">Python + Flask + Transformers for real-time sentiment analysis</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Flask</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">Transformers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              👥 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Who It's For</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-8 h-8" />, title: "Self-Care Enthusiasts", desc: "People who want to understand and manage their emotional health" },
              { icon: <Code className="w-8 h-8" />, title: "Developers", desc: "Looking to learn full-stack development with AI integration" },
              { icon: <Users className="w-8 h-8" />, title: "Students", desc: "Working on portfolio-worthy projects and learning new technologies" },
              { icon: <Globe className="w-8 h-8" />, title: "Curious Minds", desc: "Anyone interested in the emotional tone of today's media landscape" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all transform hover:scale-105">
                <div className="text-purple-400 mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent italic">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border-l-4 border-purple-500">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md p-12 rounded-3xl border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Why It Matters</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              In a world filled with emotional noise, SentiLog AI helps you cut through the clutter. 
              It's not just a journaling app. It's not just a news analyzer. 
              It's a personal emotional intelligence toolkit—powered by AI, made for humans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border border-purple-500 text-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
                onClick={() => window.open('https://github.com/openml-stack/SentiLog-AI', '_blank')}> {/* Updated onClick */}
                View on GitHub
              </button>

              <button className="border border-cyan-500 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105">
                Explore Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SentiLog AI
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Personal emotional intelligence toolkit—powered by AI, made for humans.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Open Source</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SentiLogLanding;
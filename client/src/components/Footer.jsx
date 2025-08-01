import React, { useContext, useEffect} from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, Zap, Shield, TrendingUp } from "lucide-react";
import { SiX } from "react-icons/si";


const Footer = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
        duration: 800,
        once: true,
      });
    });
  }, []);

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" data-aos="fade-up">
          
          {/* Brand Section */}
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SentiLog AI
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 max-w-md">
              Transform your data into actionable insights with the power of advanced sentiment analysis and AI-driven analytics.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <SiX className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Linkedin className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Mail className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
              Product
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/analyze" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Analyze</Link></li>
              <li><Link to="/journal" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Journal</Link></li>
              <li><Link to="/news" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">News</Link></li>
              <li><Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-indigo-600" />
              Support
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</Link></li>
              <li><Link to="/Contact" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">System Status</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-5 border-t border-slate-200 dark:border-slate-800" data-aos="fade-up" data-aos-delay="400" data-aos-offset="0"
  data-aos-duration="800"
  data-aos-anchor-placement="top-bottom">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <span>© {new Date().getFullYear()} SentiLog AI</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>for open source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

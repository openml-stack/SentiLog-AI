// src/context/ThemeProvider.jsx
import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
  // Initialize based on what's already applied to DOM
  const [theme, setTheme] = useState(() => {
    // Check if dark class is already applied by HTML script
    const isDarkApplied = document.documentElement.classList.contains('dark');
    return isDarkApplied ? 'dark' : 'light';
  });

  // Only run once on mount - sync with what HTML script already did
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && systemPrefersDark);
    
    console.log('Initial theme sync:', {
      saved,
      systemPrefersDark,
      shouldBeDark,
      currentDOMClass: document.documentElement.classList.contains('dark')
    });

    // Only update if there's a mismatch (shouldn't happen with HTML script)
    if (shouldBeDark && !document.documentElement.classList.contains('dark')) {
      console.log('Adding dark class to sync with logic');
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else if (!shouldBeDark && document.documentElement.classList.contains('dark')) {
      console.log('Removing dark class to sync with logic');
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      // Already in sync, just update state
      setTheme(shouldBeDark ? 'dark' : 'light');
    }
  }, []);

  // Handle theme changes after initialization
  useEffect(() => {
    if (theme === 'dark') {
      console.log('Applying dark theme');
      document.documentElement.classList.add('dark');
    } else {
      console.log('Applying light theme');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    
    if (theme === 'dark') {
      console.log('Switching to light theme');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      console.log('Switching to dark theme');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggle = (e) => {
    e.preventDefault();

    // Fallback for browsers that don't support view transitions
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div 
      className="flex items-center justify-center p-1 cursor-pointer" 
      onClick={handleToggle}
    >
      <label className="relative inline-flex items-center pointer-events-none">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          readOnly
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-slate-700 transition duration-300 ease-in-out shadow-inner border border-gray-400/50 peer-checked:border-slate-600"></div>
        <div className="absolute left-1.5 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5 shadow-md border border-gray-200 flex items-center justify-center">
          {theme === 'dark' ? (
            <Moon size={14} className="text-black drop-shadow-sm" />
          ) : (
            <Sun size={14} className="text-gray-800 drop-shadow-sm" />
          )}
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;

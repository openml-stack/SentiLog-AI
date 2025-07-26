import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react'; // or use emoji/icons

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center p-1">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition duration-300 ease-in-out"></div>
        <div className="absolute left-1.5 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-6"></div>
        <span className="absolute text-black left-3 top-2 text-xs peer-checked:hidden">
          <Sun size={16} />
        </span>
        <span className="absolute text-black right-2 top-2 text-xs hidden peer-checked:block">
          <Moon size={16} />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react'; // You can install this icon library via npm

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white transition-all"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkModeToggle;
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-between p-1 rounded-full w-16 h-8 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-xs ${className}`}
    >
      {/* Visual icon indicators inside the track */}
      <span className="flex items-center justify-center w-6 h-6 text-amber-500 z-0">
        <Sun className="w-3.5 h-3.5" />
      </span>
      <span className="flex items-center justify-center w-6 h-6 text-indigo-300 z-0">
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Sliding knob */}
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-slate-950 shadow-md transform transition-transform duration-200 flex items-center justify-center border border-slate-200/80 dark:border-slate-700 ${
          isDark ? 'translate-x-8 text-indigo-400' : 'translate-x-0 text-amber-500'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-indigo-400/20" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-amber-500/20" />
        )}
      </span>
    </button>
  );
};

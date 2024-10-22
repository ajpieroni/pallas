// src/components/Header.tsx
"use client";
import OwlIcon from "./OwlIcon"; // Adjust path if necessary
import { useTheme } from "../contexts/ThemeContext";
const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="flex items-center p-4 bg-white shadow-md z-10">
      <OwlIcon className="h-8 w-8 animate-pulse" />{" "}
      {/* Add animation or styling */}
      <h1 className="ml-2 text-2xl font-serif text-black">Pallas</h1>
      <button
        onClick={toggleTheme}
        className="ml-auto p-2 rounded focus:outline-none"
      >
        {isDarkMode ? "🌙" : "🌞"}{" "}
        {/* Moon icon for dark mode, Sun for light mode */}
      </button>
    </header>
  );
};

export default Header;

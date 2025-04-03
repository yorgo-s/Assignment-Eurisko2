import React from "react";
import { ThemeMode } from "../types";

interface HeaderProps {
  onCreateUser: () => void;
  onLogout: () => void;
  onToggleTheme: () => void;
  theme: ThemeMode;
}

const Header: React.FC<HeaderProps> = ({
  onCreateUser,
  onLogout,
  onToggleTheme,
  theme,
}) => {
  return (
    <header
      className={`${
        theme === "dark" ? "bg-[#3251D0]" : "bg-[#3251D0]"
      } text-white py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0`}
    >
      <h1 className="text-xl font-semibold">User Management</h1>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className={`${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-white hover:bg-gray-100"
          } ${
            theme === "dark" ? "text-white" : "text-[#3251D0]"
          } px-3 sm:px-4 py-2 rounded font-medium transition-colors`}
          onClick={onCreateUser}
        >
          Create User
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded font-medium transition-colors"
          onClick={onLogout}
        >
          Logout
        </button>
        <button
          className="text-white p-2 rounded hover:bg-[#3251D0] transition-colors"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

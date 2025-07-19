import React from "react";

interface Props {
  label?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SubmitButton({
  label = "Submit",
  type = "submit",
  onClick,
  className = "",
  isLoading = false,
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
          px-4 py-2 rounded transition-all
          ${
            isLoading || disabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
          ${className}
        `}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

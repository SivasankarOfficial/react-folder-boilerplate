// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo
        secondary: "#06B6D4", // Cyan
        success: "#10B981", // Emerald
        warning: "#F59E0B", // Amber
        error: "#EF4444", // Rose
        dark: "#111827", // Gray-900
        light: "#F9FAFB", // Gray-50
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

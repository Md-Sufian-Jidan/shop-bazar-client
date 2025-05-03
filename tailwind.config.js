/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",    // Orange-500
        secondary: "#10B981",  // Emerald-500
        accent: "#1D4ED8",     // Blue-700
        textColor: "#1F2937",  // Gray-800
        background: "#F9FAFB", // Off-white
      },
    },
  },
  plugins: [],
}


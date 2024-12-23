/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        whiteDefault: "var(--white-color)",
        blackDefault: "var(--black-color)",
        blueDefault: "var(--blue-color)",
        redDefault: "var(--red-color)",
        low: "var(--low-color)",
        mid: "var(--mid-color)",
        high: "var(--high-color)",
        urgent: "var(--urgent-color)",
      },
    },
  },
  plugins: [],
};

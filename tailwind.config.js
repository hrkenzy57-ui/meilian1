/** @type {import('tailwindcss').Config} */
module.exports = {
_toggle: false,
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px rgba(2, 8, 23, 0.08)",
      }
    }
  },
  plugins: []
};

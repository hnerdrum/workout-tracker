/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{css,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}

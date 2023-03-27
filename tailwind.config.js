/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F2F2F2",
          dark: "#1A202C",
        },
        secondary: {
          light: "#E5E5E5",
          dark: "#2D3748",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      borderColor: ["dark"],
      textColor: ["dark"],
    },
  },
  plugins: [],
};

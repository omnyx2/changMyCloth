/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "#222",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        skintone: '#DE9B72',
        dark: '#222',
      },
      fontFamily: {
        countach: ['Countach', 'sans-serif'],
        'tilda-petite': ['Tilda Petite', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        bangers: ["Bangers", 'system-ui'],
        paralines: ['Paralines', 'sans-serif']
      },
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      marginDown: {
        "0%": { margin: "100px" },
        "50%": { margin: "0px" },
      },
      marginUp: {
        "0%": { margin: "0px" },
        "50%": { margin: "100px" },
      },
    },
    animation: {
      wiggle: "wiggle 1s ease-in-out infinite",
      marginDown: "marginDown 2s ease-in-out",
      marginUp: "marginUp 2s ease-in-out",
    },
  },
  plugins: [],
};

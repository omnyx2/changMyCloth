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
      comeUp: {
        "0%": { transform: "translateY(200px)" },
        "50%": { transform: "translateY(0px)" },
      },
      marginDown: {
        "0%": { margin: "100px" },
        "50%": { margin: "0px" },
      },
      marginUp: {
        "0%": { margin: "0px" },
        "50%": { margin: "100px" },
      },
      blinkUP: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
      blickDOWN: {
        "0%, 100%": { opacity: 0 },
        "50%": { opacity: 1 },
      },
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
    animation: {
      wiggle: "wiggle 1s ease-in-out infinite",
      marginDown: "marginDown 2s ease-in-out",
      marginUp: "marginUp 2s ease-in-out",
      blinkUP: "blinkUP 5.8s ease-in-out infinite",
      blinkDOWN: "blickDOWN 5.8s ease-in-out infinite",
      comeUp: "comeUp 1s ease-in-out",
      fadeIn: "fadeIn 1s ease-in-out",
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.tsx", "./app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // Main color properties
        primary: "#06070a",
        "blue-500": "#2f8af5",
        "light-blue-500": "#6c86ad",
        "dark-blue-400": "#141924",

        // Button colors
        "btn-gradient-primary":
          "linear-gradient(73.28deg, #495bfc 6.51%, #114188 88.45%)",
        "btn-dark-500": "#0d2039",
        "btn-dark-400": "#1e3d66",
      },
    },
  },
  plugins: [],
};

export default config;

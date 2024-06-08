import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main color properties
        primary: "#06070a",
        blue500: "#2f8af5",

        // Buttons
        btnGradientPrimary:
          "linear-gradient(73.28deg, #495bfc 6.51%, #114188 88.45%)",
      },
    },
  },
  plugins: [],
};

export default config;

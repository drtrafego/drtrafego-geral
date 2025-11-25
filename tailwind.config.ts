
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'purple-glow': 'radial-gradient(circle, rgba(156, 39, 176, 0.3) 0%, rgba(156, 39, 176, 0) 70%)',
        'fuchsia-glow': 'radial-gradient(circle, rgba(88, 28, 135, 0.3) 0%, rgba(88, 28, 135, 0) 70%)',
      },
    },
  },
  plugins: [],
};
export default config;

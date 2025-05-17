/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {    extend: {
      colors: {
        primary: {
          DEFAULT: "#0070f3",
          dark: "#0051b3",
          light: "#3391ff",
          50: "#e6f0ff",
          100: "#b3d1ff",
          200: "#80b3ff",
          300: "#4d94ff",
          400: "#1a75ff",
          500: "#0070f3",
          600: "#005cc4",
          700: "#004799",
          800: "#00336d",
          900: "#001f42"
        },
        secondary: {
          DEFAULT: "#7928ca",
          dark: "#5c1e99",
          light: "#9651e5"
        },
        background: "#ffffff",
        foreground: "#1f2937",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        accent: "#f9fafb",
        "accent-foreground": "#111827",
        border: "#e5e7eb",
        card: "#ffffff",
        "card-foreground": "#1f2937",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        success: "#22c55e",
        "success-foreground": "#ffffff"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #0070f3, #7928ca)',
      },
      borderColor: {
        DEFAULT: "#e5e7eb"
      }
    },
  },  plugins: [require("tailwindcss-animate")],
  darkMode: "class"
}

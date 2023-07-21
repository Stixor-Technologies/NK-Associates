/** @type {import('tailwindcss').Config} */
// import "@fontsource/metropolis";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ["Metropolis", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'metropolis': ['var(--font-metroplis)'],
      },
      colors: {
        'nk-red': '#E74451',
        "nk-gradient-red-one": "#E4404A",
        "nk-gradient-red-two": "#EB4B5E",
        "nk-gradient-red-sharp-one": "#ED1C24",
        "nk-gradient-red-sharp-two": "#F42F4D",
        "nk-black": "#333333", //also used for font
        "nk-white": "#FFFFFF",
        "nk-gray": "#969696", //also used for faded font
        "nk-light-gray": "#EDEDED", //modal
        "nk-dark-gray": "#303030", //footer
      },
    },
  },
  plugins: [],
};

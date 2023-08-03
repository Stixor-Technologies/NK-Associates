/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "nk-bg": "url('/assets/images/bg-property.svg')",
      },
      fontFamily: {
        metropolis: ["var(--font-metroplis)"],
        "metropolis-semibold": ["var(--font-metroplis-semiBold)"],
        "metropolis-bold": ["var(--font-metroplis-bold)"],
        "metropolis-extrabold": ["var(--font-metroplis-extraBold)"],
        "metropolis-light": ["var(--font-metroplis-light)"],
        "metropolis-medium": ["var(--font-metroplis-medium)"],
        "metropolis-extralight": ["var(--font-metroplis-extraLight)"],
        "metropolis-thin": ["var(--font-metroplis-Thin)"],
      },
      colors: {
        "nk-red": "#E74451",
        "nk-gradient-red-one": "#E4404A",
        "nk-gradient-red-two": "#EB4B5E",
        "nk-gradient-red-sharp-one": "#ED1C24",
        "nk-gradient-red-sharp-two": "#F42F4D",
        "nk-black": "#333333", //also used for font
        "nk-white": "#FFFFFF",
        "nk-white-dark": "#F5F5F5",
        "nk-gray": "#969696", //also used for faded font
        "nk-light-gray": "#EDEDED", //modal
        "nk-dark-gray": "#303030", //footer
        "nk-grey": "#727272",
        "nk-background": "#f5f5f5",
      },

      boxShadow: {
        'pulse-before': '9984px 0 0 -5px',
        'pulse': "9999px 0 0 -5px",
        'pulse-after': '10014px 0 0 -5px',
      },

      keyframes: {
        "dot-pulse": {
          "0%": {
            "box-shadow": "9999px 0 0 -5px",
          },
          "30%": {
            "box-shadow": "9999px 0 0 2px",
          },
          "60%": {
            "box-shadow": "9999px 0 0 -5px",
          },
          "100%": {
            "box-shadow": "9999px 0 0 -5px",
          },
        },

        "dot-pulse-before": {
          "0%": { boxShadow: "9984px 0 0 -5px" },
          "30%": { boxShadow: "9984px 0 0 2px" },
          "60%": { boxShadow: "9984px 0 0 -5px" },
          "100%": { boxShadow: "9984px 0 0 -5px" },
        },

        "dot-pulse-after": {
          "0%": { boxShadow: "10014px 0 0 -5px" },
          "30%": { boxShadow: "10014px 0 0 2px" },
          "60%": { boxShadow: "10014px 0 0 -5px" },
          "100%": { boxShadow: "10014px 0 0 -5px" },
        },
      },

      animation: {
        "dot-pulse-before": "dot-pulse-before 1.5s 0s infinite linear",
        "dot-pulse": "dot-pulse 1.5s 0.25s infinite linear",
        "dot-pulse-after": "dot-pulse-after 1.5s 0.5s infinite linear",
      },

       boxShadow: {
        "3xl": "0.25rem 0.188rem 1.375rem 0rem rgba(0, 0, 0, 0.092)",
      },
      spacing: {
        '1/2': '50%',
        '3/4': '75%'
      }
    },
  },
  plugins: [],
};

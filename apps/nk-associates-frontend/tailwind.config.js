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

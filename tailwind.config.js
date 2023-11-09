module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      // Defined here: https://www.figma.com/file/xOu73pWJgkrezff9FKrD5E/Small-Projects?node-id=345%3A43
      // Colour variants are postfixed with an extra "0"

      // PRIMARY COLOURS
      black: "#000000", // alias for charcoal-700
      white: "#FFFFFF", // alias for charcoal-0

      // PRIMARY VARIANTS
      charcoal: {
        DEFAULT: "#000000",
        0: "#FFFFFF",
        100: "#FAFAFA",
        200: "#EAEAEA",
        300: "#CECECE",
        350: "#BFBFBF",
        400: "#9F9F9F",
        500: "#707070",
        600: "#333333",
        700: "#000000",
      },
      blue: {
        DEFAULT: "#0573E8",
        100: "#0573E8",
        200: "#135FC5",
        300: "#003884",
        400: "#1F3C5F",
      },
      sky: {
        DEFAULT: "#E0F0FF",
        100: "#E0F0FF",
        200: "#BDDEFF",
        300: "#99CEFF",
        400: "#7EB9F0",
        500: "#4498ED",
      },

      // SECONDARY
      pink: {
        DEFAULT: "#FFC6C6",
        100: "#FFC6C6",
        200: "#FAB5B5",
        300: "#F0A4A4",
        500: "#BA7070",
      },
      orange: {
        DEFAULT: "#FFBD6F",
        100: "#FFBD6F",
        200: "#FFAC4B",
        300: "#F5980C",
        500: "#BD7433",
      },
      yellow: {
        DEFAULT: "#FCD858",
        100: "#FCD858",
        200: "#F8CB2C",
        300: "#E9BA16",
        500: "#AB8E28",
      },
      green: {
        DEFAULT: "#A6D669",
        100: "#A6D669",
        200: "#93C94F",
        300: "#81B241",
        500: "#689332",
      },
      violet: {
        DEFAULT: "#BDAEF8",
        100: "#BDAEF8",
        200: "#AF9DF2",
        300: "#9E8BE8",
        500: "#796DC3",
      },
      red: {
        500: "#FF6699",
      },

      // SKIN TONES
      skin: {
        100: "#F8E7CD",
        200: "#E6BF99",
        300: "#BD8A5A",
        400: "#8A5935",
        500: "#573515",
        110: "#F8DCCD",
        210: "#C69378",
        310: "#BD7B5A",
        410: "#914423",
        510: "#683124",
      },

      // RESPONSE
      success: "#A6D669",
      error: "#EF5D5D",

      // ADMIN: ORGANIZATIONAL AREAS
      "org-areas": {
        engineering: "#53599A",
        design: "#00A896",
        product: "#DE6449",
        community: "#DA4167",
      },
    },
    fontFamily: {
      poppins: "Poppins, sans-serif",
      source: "'Source Sans Pro', sans-serif",
    },
    extend: {
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(8rem, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(8rem, 1fr))",
      },
      backgroundImage: {
        "how-it-works": "url('/landing/how-it-works-background.svg')",
        "nonprofits-md": "url('/nonprofits/hero-background-md.svg')",
        "nonprofits-lg": "url('/nonprofits/hero-background-lg.svg')",
        "students-hero": "url('/students/students-landing-bg.svg')",
        "join-hero": "url('/join/hero-background.svg')",
        "about-us-mission": "url('/about/mission-background.svg')",
        "about-us-circles-md": "url('/about/circle-images-tablet.png')",
        "about-us-circles-lg": "url('/about/circle-images.png')",
      },
      width: {
        120: "30rem",
        160: "40rem",
        240: "60rem",
        card: "calc(100% - 2rem)",
      },
      height: {
        144: "36rem",
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/line-clamp"), // Multi-line text truncation
    require("@tailwindcss/forms"), // Form styling
  ],
};

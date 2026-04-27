module.exports = {
   content: ["./src/**/*.{njk,md,html}"],
   theme: {
      extend: {
         fontFamily: {
            "open-sans": ["Open Sans", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
         },
      },
   },
   plugins: [require("@tailwindcss/typography")],
}

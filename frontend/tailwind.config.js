/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				"accent": "#f65900",
			}
		},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

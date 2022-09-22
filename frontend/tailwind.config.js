/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		aspectRatio: {
			auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
		},
    extend: {
			colors: {
				"accent": "#f65900",
			},
			zIndex: {
				'dropdown': 1000,
				'sticky': 1020,
				'fixed': 1030,
				'modal-backdrop': 1040,
				'modal': 1050,
				'popover': 1060,
				'tooltip': 1070,
			}
		},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
}

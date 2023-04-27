/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		extend: {
			colors: {
				leafGreen: "#505433",
			},
		},
	},
	plugins: [],
	safelist: [
		{
			pattern: /(bg|text|border)-leaf(Green)/,
		},
	],
};

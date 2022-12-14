/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				lora: ['Lora, serif'],
				jose: ['Josefin Sans, sans-serif'],
				varela: ['Varela Round, Arial, Helvetica, sans-serif'],
				joseSans: ['Josefin Sans, Arial, Helvetica, sans-serif']
			}
		}
	},
	plugins: []
};

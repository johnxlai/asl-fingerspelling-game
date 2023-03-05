/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{handlebars,html}'],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'system-ui'],
      display: ['"Tilt Warp"', 'cursive'],
      body: ['"Open Sans"'],
      custom: ['"Tilt Warp"', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
};

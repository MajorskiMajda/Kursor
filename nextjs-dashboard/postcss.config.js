// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},  // Enables Tailwind CSS
    autoprefixer: {},  // Adds vendor prefixes for better browser support
    'postcss-preset-env': {
      browsers: 'last 2 versions',  // Use the last two versions of browsers
    },
  },
};

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 2, // default
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
  },
};

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: '> 0.25%, not dead',
        corejs: 3,
        targets: {
          esmodules: true,
        },
        debug: false,
      },
    ],
    'solid',
  ],
  plugins: ['preval', 'macros'],
};

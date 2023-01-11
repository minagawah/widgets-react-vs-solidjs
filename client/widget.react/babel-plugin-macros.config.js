module.exports = {
  twin: {
    preset: 'emotion',
    config: './src/tailwind.config.js',
    styled: {
      import: 'default',
      from: '@emotion/styled',
    },
    css: {
      import: 'css',
      from: '@emotion/react',
    },
    global: {
      import: 'Global',
      from: '@emotion/react',
    },
    debugPlugins: false,
    debug: false,
  },
};

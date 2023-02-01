const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    init: './src/widgets/init.js',
    footer: './src/widgets/footer.jsx',
    breadcrumbs: './src/widgets/breadcrumbs.jsx',
    language: './src/widgets/language.jsx',
    translate: './src/widgets/translate.jsx',
    translate_content: './src/widgets/translate_content.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../../server/public/build'),
    filename: 'widget.react.[name].js',
    chunkFilename: 'widget.react.[name].js',
    library: ['ReactWidget', '[name]'],
    libraryTarget: 'umd',
  },
  stats: {
    colors: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: { svgo: false },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'all',
        },
        default: {
          minSize: 563200,
          priority: 0,
          chunks: 'all',
        },
      },
    },
  },
};

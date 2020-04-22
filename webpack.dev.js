const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TailwindCSS = require('tailwindcss');
const Autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Apply rules for .css files in development mode
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [TailwindCSS, Autoprefixer],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.development',
    }),
  ],
  devServer: {
    port: 5000,
    contentBase: './public',
    hot: true,
  },
};

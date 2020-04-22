const Dotenv = require('dotenv-webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TailwindCSS = require('tailwindcss');
const Autoprefixer = require('autoprefixer');
const PurgeCSS = require('@fullhuman/postcss-purgecss')({
  content: ['./public/*.html'],
});
const CSSNano = require('cssnano');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Apply rules for .css files in production mode
        test: /\.(css)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'potscss',
              plugins: [TailwindCSS, Autoprefixer, PurgeCSS, CSSNano],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
    new MiniCSSExtractPlugin({
      filename: 'assets/css/styles.css',
    }),
  ],
  devServer: {
    contentBase: './public',
  },
};

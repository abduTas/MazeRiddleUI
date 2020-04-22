const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        // Apply rules for .js and .jsx files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // Apply rules for image files
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/img/[name].[ext]',
          },
        },
      },
      {
        // Apply rules for .svg files
        test: /\.(svg)$/,
        use: ['@svgr/webpack'],
      },
      {
        // Apply rules for fonts
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/fonts/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
  //   output: {
  //     path: path.resolve(__dirname, '../', 'public'),
  //     publicPath: '/',
  //     filename: 'assets/js/index.js',
  //   },
  output: {
    path: path.resolve(__dirname, 'build'), // change this
    publicPath: '/',
    filename: 'index.js',
  },
};

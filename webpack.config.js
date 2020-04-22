// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// var config = {
//   entry: './src/main.js',
//   output: {
//     path: path.resolve(__dirname, 'build'), // change this
//     publicPath: '/',
//     filename: 'index.js',
//   },
//   devServer: {
//     inline: true,
//     port: 8080,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       appMountId: 'app',
//       filename: 'index.html',
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         enforce: 'pre',
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         loader: 'eslint-loader',
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.(jpg|png|gif|svg|pdf|ico)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name]-[hash:8].[ext]',
//             },
//           },
//         ],
//       },
//     ],
//   },
// };
// module.exports = config;

const mergeConfig = require('webpack-merge');
const commonConfig = require('./webpack.common');
const getAddons = (addonsArgs) => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

  return addons.filter(Boolean).map((name) => require(`./webpack.${name}.js`));
};

module.exports = ({ env, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return mergeConfig(commonConfig, envConfig, ...getAddons(addon));
};

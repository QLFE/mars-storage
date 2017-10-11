const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/storage.js',
  output: {
    library: 'storage',
    libraryTarget: 'umd',
    filename: 'storage.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
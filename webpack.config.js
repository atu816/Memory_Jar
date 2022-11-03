const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    // static: {
    //   publicPath: '/build',
    //   directory: path.resolve(__dirname, 'build')
    // },
    proxy: {
      '/': 'http://localhost:3000'
    },
  },
  // mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [new HtmlWebPackPlugin({
    title: 'Development',
    template: './client/index.html'
  })]
}
const webpack = require('webpack');
const { resolve } = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = () => ({
  context: resolve(__dirname, 'client'),
  entry: './app.jsx',
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        // SCSS and CSS
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // Different image formats
        // Outputs to public/assets/images/ folder
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        loader: "file-loader",
        query: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      },
      {
        // To support @font-face rule
        // Outputs to public/assets/fonts/ folder 
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        // JSX and JS
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // HTML
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    // import('Component.jsx') can now be written like import('Component')
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({ template: 'index.html' })
  ],
  devServer: {
    contentBase: "./build"
  }
});

module.exports = config;
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss|css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              context: '',
            },
          },
        ],
        include: [path.join(__dirname, 'src', 'static', 'fonts')],
      },
      {
        test: /\.(png|jpe?g|svg|svgz)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 5 kB
              limit: 5 * 1024,
              name: '[name].[ext]?[hash]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
        include: [path.join(__dirname, 'src', 'static', 'images')],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',
      template: path.join(__dirname, 'src', 'static', 'index.html'),
      favicon: path.join(__dirname, 'src', 'static', 'favicon.png'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    fallback: { 
      "fs": false,
      "path": false 
    }
  },
};

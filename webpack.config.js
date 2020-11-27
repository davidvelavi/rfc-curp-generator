const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve:{
    extensions : ['.js', '.jsx']
  },
  module:{
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /.html$/,
        use:'html-loader'
      },
      {
        test: /\.(s|css)$/,
        use:['sass-loader', miniCssExtractPlugin.loader ,'css-loader']
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new miniCssExtractPlugin({
      filename: 'assets/[name].css'
    })
  ],
}
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUBLIC_DIR = 'public';


module.exports = {
    entry: {
      charts:[
        'babel-polyfill', path.resolve(__dirname, 'src', 'charts.js')
      ]
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
              exclude: /node_modules/,
              test: /\.css$/,
              use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: MiniCssExtractPlugin.loader,                    
                    
                    options: {
                        modules: true
                    }
                },
                'css-loader'
              ]
          }
        ]
      },
    plugins: [
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          title: "Index",
          template: path.resolve(__dirname, PUBLIC_DIR, 'index.html'),
          inject: true,
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, PUBLIC_DIR, 'charts.html'),
        inject: true,
        chunks: ['charts'],
        filename: 'charts.html'
      }),
        
    ],
    output: {
        filename: '[name]-[hash]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'web'
};
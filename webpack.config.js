const path = require('path')
const webpack = require('webpack')

var config = {
    entry: './main.js',
     
    output: {
       path: path.resolve(__dirname),
       filename: 'index.bundle.js',
    },
     
    devServer: {
       contentBase: './',
       historyApiFallback: true,
       inline: true,
       port: 8080
    },
     
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
                 
             query: {
                presets: ['es2015', 'react']
             }
          },
          { test: /\.css$/, loader: "style-loader!css-loader" }
       ]
    }
 }
 
 module.exports = config;
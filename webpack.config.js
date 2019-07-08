const Dotenv = require('dotenv-webpack');

module.exports = {
    devtool: 'source-map',
    output: {
      path: __dirname + '/public/js',
      filename: 'bundle.js'
    },
    entry: ['babel-polyfill', './src/index.js'],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]"
              }
            },
            { loader: "less-loader" }
          ]
        }
      ]
    },
    plugins: [new Dotenv({ systemvars: true })]
};
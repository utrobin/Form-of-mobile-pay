var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'test': "./test.js",
    'bundle': ["./public/index.js"],
  },
  output: {
    path: "./public/built",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react', 'stage-2']}
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin("style.css",  {allChunks: true})
  ]
};
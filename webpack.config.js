const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
     }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/public/",
    filename: "filecaddy.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public/")
    },
    port: 3000,
    devMiddleware: {
      publicPath: "http://localhost:3000/"
    },
    hot: "only"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

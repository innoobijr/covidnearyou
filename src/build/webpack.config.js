var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        use: "babel-loader",
      },
      { test: /\.html$/, use: "html-loader" },
      {
        test: /\.woff/,
        use:
          require.resolve("url-loader") +
          "?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[hash].[ext]",
      },
      { test: /\.tff/, use: "file-loader" },
      {
        test: /\.eot/,
        use:
          require.resolve("file-loader") +
          "?prefix=font/&name=assets/[hash].[ext]",
      },
      { test: /\.svg/, use: "file-loader" },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
      inject: "body",
      hash: true,
    }),
  ],
  optimization: {
    splitChunks: {
      name: "vendor",
      minChunks: 2,
    },
  },
};

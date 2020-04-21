var webpack = require("webpack");
var path = require("path");
var config = require("./webpack.config");

config.output = {
  filename: "[name].bundle.js",
  publicPath: "/",
  path: path.resolve(__dirname, "client"),
};

config.mode = "development";

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
]);

module.exports = config;

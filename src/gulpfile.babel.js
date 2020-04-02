import gulp from "gulp";
import webpack from "webpack";
import path from "path";
import rename from "gulp-rename";
import template from "gulp-template";
import yargs from "yargs";
import gutil from "gulp-util";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import colorSupported from "supports-color";
import historyApiFallback from "connect-history-api-fallback";

var server = require("browser-sync").create();
let root = "client";

// helper method for resolving paths
let resolveToApp = (glob = "") => {
  return path.join(root, "app", glob);
};

let resolveToComponents = (glob = "") => {
  return path.join(root, "app/components", glob);
};

// map of all paths
let paths = {
  js: resolveToComponents("**/*!(spec.js).js"),
  scss: resolveToApp("**/*.scss"), // stylsheets
  html: [resolveToApp("**/*.html"), path.join(root, "index.html")],
  entry: path.join(__dirname, root, "app/app.js"),
  output: root,
  blankTemplates: path.join(__dirname, "generator", "component/**/*.**"),
};

//use webpack.config.js to build modules
function build(cb) {
  const config = require("./build/webpack.config.prod");
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log(
      "[webpack]",
      stats.toString({
        colors: colorSupported,
        chunks: false,
        errorDetails: true,
      })
    );
    cb();
  });
}

function serve(cb) {
  const config = require("./build/webpack.config.dev");
  config.entry.app = ["webpack-hot-middleware/client?reload=true", paths.entry];

  var compiler = webpack(config);

  server.init({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: root },
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorSupported,
          chunks: false,
          modules: false,
        },
        publicPath: config.output.publicPath,
      }),
      webpackHotMiddleware(compiler),
    ],
  });
  cb();
}

function component() {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || "";
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp
    .src(paths.blankTemplates)
    .pipe(
      template({
        name: name,
        upCaseName: cap(name),
      })
    )
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace("temp", name);
      })
    )
    .pipe(gulp.dest(destPath));
}

exports.ngCreate = component;
exports.default = serve;

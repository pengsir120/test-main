// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require("path");
const webpack = require("webpack");
const modules = require("./modules").default;
const SERVE_APP_NAME = process.env.SERVE_APP_NAME;
const SERVE_TYPE = process.env.SERVE_TYPE;

const moduleAlias =
  SERVE_TYPE === "single" && SERVE_APP_NAME
    ? {
        [SERVE_APP_NAME + "/src"]: path.resolve(__dirname, "../../src"),
      }
    : Object.keys(modules).reduce((acc, name) => {
        acc[name + "/src"] =
          SERVE_APP_NAME === name
            ? path.resolve(__dirname, "../../src")
            : path.resolve(__dirname, `./node_modules/${name}/src`);
        return acc;
      }, {});

module.exports = {
  publicPath: process.env.BASE_URL,
  lintOnSave: false,
  transpileDependencies: SERVE_TYPE === "single" ? [] : [/nmg-dr-\w+/],
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.output.filename("[name].[hash].js").end();
    config.output.chunkFilename("[name].[hash].js").end();
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        subp: path.resolve(__dirname, "../../src"),
        "main/src": path.resolve(__dirname, "./src"),
        ...moduleAlias,
        vue$: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm.js"
        ),
      },
    },
    // plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  }
};

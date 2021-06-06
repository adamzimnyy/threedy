const path = require("path");
const webpack = require("webpack");
const PreactRefreshPlugin = require("@prefresh/webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new PreactRefreshPlugin(),
  ],
  devServer: {
    hot: true, // ensure dev-server.hot is on
    contentBase: "./dist",
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
    },
  },
  output: {
    filename: "threedy-card.js",
    path: path.resolve(__dirname, "dist"),
  },
};

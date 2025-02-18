const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
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
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "ImgLoadingLibrary",
    libraryTarget: "window",
  },
  plugins: [
    new webpack.ProvidePlugin({
      ImgLoading: ["./dist/ImgLoading.js", "ImgLoading"],
    }),
  ],
};

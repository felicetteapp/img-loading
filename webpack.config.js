const path = require("path");

module.exports = [
  // CommonJS build
  {
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
      library: {
        name: "ImgLoading",
        type: "umd",
        export: "ImgLoading",
      },
      globalObject: "this",
    },
  },
  // ESM build (for modern bundlers like Vite)
  {
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
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "bundle.esm.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        type: "module",
      },
    },
  },
];

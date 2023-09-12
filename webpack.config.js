const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/login.js",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "login.js",
    filename: "bundle.js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

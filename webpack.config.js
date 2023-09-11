const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  entry: "./src/login.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    filename: "login.js",
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

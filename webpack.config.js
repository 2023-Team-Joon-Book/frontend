const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,  // 정규 표현식 수정
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /\.css$/,  // 정규 표현식 수정
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  }
};
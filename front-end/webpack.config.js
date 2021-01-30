const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: ""
  },
  devServer: {
    publicPath: "/",
    contentBase: path.join(__dirname),
    compress: true,
    writeToDisk: true
    // headers: {
    // 	"Access-Control-Allow-Origin": "*",
    // 	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    // 	"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // }
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }, {
          loader: "react-hot-loader/webpack"
        }]
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg|gif)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "../dist/assets/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          "postcss-loader"]
      }
    ]
  },
  externals: {
    myApp: "myApp"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hickarium",
      filename: "index.html",
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin()]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        conditionals: true,
        booleans: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      minimize: true
    })
  );
}

module.exports = config;
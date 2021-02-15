const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: ""
  },
  devServer: {
    publicPath: "",
    contentBase: path.join(__dirname),
    compress: true,
    writeToDisk: true,
    port: 9000
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
              name: "[hash].[ext]",
              outputPath: "assets/",
              publicPath: "/assets/"
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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HOST_API_URL: JSON.stringify(
          process.env.NODE_ENV === "production" ?
            "https://medialib.hickar.space/api" :
            "https://www.localhost/api")
      }
    })
  ],
  optimization: {
    minimizer: []
  }
};

if (process.env.NODE_ENV === "production") {
  config.optimization.minimizer.push(
    new UglifyJSPlugin()
  );
}

module.exports = config;
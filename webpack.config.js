const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
var WebpackNotifierPlugin = require("webpack-notifier");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = env => {
  const devMode = env.production ? false : true;  

  if (!devMode) {
    console.log("🔥 🔥 🔥  BUILDING FOR PRODUCTION 🔥 🔥 🔥");
  }  

  return {
    mode: devMode ? "development" : "production",
    entry: "./src/site.js",
    output: {
      filename: "site.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {                    
          vue$: "vue/dist/vue.esm.js"
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /(node_modules|bower_components)/,
          loader: "vue-loader",
          options: {
            transformToRequire: {
              video: "src",
              source: "src",
              img: "src",
              image: "xlink:href"
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 1 }
            },
            "postcss-loader"
          ]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 1 }
            },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name(file) {
                  if (devMode) {
                    return "[name].[ext]";
                  }
                  return "[name].[ext]";
                },
                outputPath: "images/"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                disable: devMode,
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name(file) {
                  if (devMode) {
                    return "[name].[ext]";
                  }
                  return "[name]-[hash].[ext]";
                },
                outputPath: "fonts/"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new MiniCssExtractPlugin({
        filename: "style.css"
      }),
      new AssetsPlugin({
        filename: "assets.json",
        path: path.resolve(__dirname, "dist")
      }),
      new WebpackNotifierPlugin({
        title: "Webpack",
        alwaysNotify: false
      }),
      new VueLoaderPlugin()
    ]
  };
};
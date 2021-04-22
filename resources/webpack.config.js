// プラグインを利用するためにwebpackを読み込んでおく
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    "searchPrefecture/js/index": [path.join(__dirname, 'js/SearchPrefecture/index.js')],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                    },
                    // 必要な箇所にだけpolyfillを読み込む設定
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname)],
  },
  plugins: [
    // 共通プラグインを利用するときはこれを書いておけばインポート不要
    new webpack.ProvidePlugin({
      velocity: 'velocity-animate',
    }),
  ],
};

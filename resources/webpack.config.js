const path = require('path');
const webpack = require('webpack');

module.exports = {
  // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  // エントリーポイントの設定
  entry: {
    "searchPrefecture/js/index": [path.join(__dirname, 'js/SearchPrefecture/index.js')],
  },
  // 出力の設定
  output: {
    // 出力するファイル名
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ['web', 'es5'],
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



// // プラグインを利用するためにwebpackを読み込んでおく
// const webpack = require('webpack');
// const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// module.exports = {
//   mode: 'production',
//   entry: {
//     "searchPrefecture/js/index": [path.join(__dirname, 'js/SearchPrefecture/index.js')],
//   },
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: '[name].bundle.js',
//   },
//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /node_modules/,
//           name: 'vendor',
//           chunks: 'initial',
//           enforce: true,
//         },
//       },
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 [
//                   '@babel/preset-env',
//                   {
//                     targets: {
//                       ie: 11,
//                     },
//                     // 必要な箇所にだけpolyfillを読み込む設定
//                     useBuiltIns: 'usage',
//                     corejs: 3,
//                   },
//                 ],
//               ],
//             },
//           },
//         ],
//         exclude: /node_modules/,
//       },
//     ],
//   },

  // resolve: {
  //   modules: ['node_modules', path.resolve(__dirname)],
  // },
  // plugins: [
  //   // 共通プラグインを利用するときはこれを書いておけばインポート不要
  //   new webpack.ProvidePlugin({
  //     velocity: 'velocity-animate',
  //   }),
  // ],
// };

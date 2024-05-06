// node packages
const path = require('path')

// webpack plugins
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// postcss
const autoprefixer = require('autoprefixer')
const postcssCustomMedia = require('postcss-custom-media')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssImport = require('postcss-import')
const postcssMixins = require('postcss-mixins')
const postcssHexRgba = require('postcss-hexrgba')

// minification
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  return {
    mode: process.env.NODE_ENV,
    entry: {
      'scripts/main': './src/scripts/main.js',
      'scripts/webfontloader': './src/scripts/fontLoader.js',
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        // scripts
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },

        // styles
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssImport(), // should be first in the list
                    postcssMixins(),
                    autoprefixer(),
                    postcssCustomProperties({ preserve: false }),
                    postcssHexRgba(),
                    postcssCustomMedia(),
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanPlugin(['./dist']),
      new MiniCssExtractPlugin({
        filename: 'styles/main.[contenthash].css',
      }),
      new HtmlPlugin({
        inject: false,
        template: './src/markup/index.html.ejs',
        filename: 'index.html',
        favicon: 'src/images/favicon.ico',
      }),
    ],
    resolve: {
      modules: [path.join(__dirname, 'src/scripts'), 'node_modules'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  }
}

// node packages
import * as path from 'path';

// webpack plugins
import * as CleanPlugin from 'clean-webpack-plugin';
import * as HtmlPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';

// postcss plugins
import * as postcssAutoprefixer from 'autoprefixer';

module.exports = () => {

  return {
    mode: process.env.NODE_ENV,
    entry: {
      'scripts/main': './src/scripts/main.js',
      'scripts/webfontloader': './src/scripts/fontLoader.js'
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        // scripts
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        // styles
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssAutoprefixer
                ]
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanPlugin(['./dist']),
      new MiniCssExtractPlugin({
        filename: 'styles/main.[contenthash].css'
      }),
      new StyleLintPlugin({
        syntax: 'scss',
        files: 'src/styles/**/*.scss'
      }),
      new HtmlPlugin({
        inject: false,
        template: './src/markup/index.html.ejs',
        filename: 'index.html',
        minify: {
          minifyJS: process.env.NODE_ENV === 'production'
        },
        favicon: 'src/images/favicon.ico'
      })
    ],
    resolve: {
      modules: [
        path.join(__dirname, 'src/scripts'),
        'node_modules'
      ]
    }
  };
};

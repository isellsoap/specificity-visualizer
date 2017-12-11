import * as webpack from 'webpack';

// node packages
import * as path from 'path';

// webpack plugins
import * as CleanPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlPlugin from 'html-webpack-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';

// postcss plugins
import * as postcssAutoprefixer from 'autoprefixer';

interface Config extends webpack.Configuration {
  module?: {
    rules: webpack.NewUseRule[]
  },
  resolve?: webpack.NewResolve
}

module.exports = (env) => {
  const isProductionBuild = env.production === 'true';

  return {
    entry: {
      'scripts/main': './src/scripts/main.js',
      'scripts/webfontloader': './src/scripts/fontLoader.js'
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].[chunkhash].js'
    },
    module: {
      loaders: [
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
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
          })
        }
      ]
    },
    plugins: [
      new CleanPlugin(['./dist']),
      new ExtractTextPlugin({
        filename: 'styles/main.[contenthash].css'
      }),
      new StyleLintPlugin({
        syntax: 'scss',
        files: 'src/styles/**/*.scss'
      }),
      new HtmlPlugin({
        inject: false,
        template: './src/markup/index.html.ejs',
        filename: '../dist/index.html',
        minify: {
          minifyJS: isProductionBuild
        }
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

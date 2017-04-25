import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import paths from './paths.js';

export default (env) => {
  return {
    entry: {
      polyfills: [
        'babel-polyfill'
      ],
      main: [
        paths.srcJs
      ]
    },
    output: {
      path: paths.distDir,
      filename: '[name].bundle.js',
      // publicPath: publicPath,
      sourceMapFilename: '[name].map'
    },
    module: {
      rules: [
        { // js
          test: /\.(js|tag)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [ 'latest', { modules: false } ]
            ]
          }
        },
        { // css
          test: /\.css$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        { // sass
          test: /\.(scss|sass)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        },
        { // img
          test: /\.(jpg|png|gif)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: 'file-loader'
        },
        { // font
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'post',
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new webpack.ProvidePlugin({
        riot: 'riot'
      }),
      new HtmlWebpackPlugin({
        template: paths.srcHtml,
      }),
      new CleanWebpackPlugin(['*'], {
        root: paths.distDir,
        exclude: '.gitkeep'
      }),
      new ExtractTextPlugin('main.css')
    ]
  };
}

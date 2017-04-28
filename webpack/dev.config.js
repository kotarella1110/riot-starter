import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import env from '../env.js';
import paths from './paths.js';

export default () => {
  return {
    entry: {
      vendor: [
        'riot-hot-reload'
      ],
      demos: [
        paths.srcDemosJs
      ]
    },
    module: {
      rules: [
        { // riot
          test: /\.(tag|tag.html)$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'riot-tag-loader',
          options: {
            type: 'es6', // transpile the riot tags using babel
            hot: true,
            debug: true
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: paths.srcDemosHtml,
        filename: 'demos.html',
        chunks: ['demos', 'polyfills', 'vendor']
      }),
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: paths.distDir,
      host: env.devServer.host || 'localhost',
      port: env.devServer.port || 8080,
      open: true,
      hot: true,
      inline: true,
    }
  };
}
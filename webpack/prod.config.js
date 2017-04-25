import webpack from 'webpack';

export default () => {
  return {
    module: {
      rules: [
        { // riot
          test: /\.tag$/,
          include: /src/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'riot-tag-loader',
          options: {
            type: 'es6', // transpile the riot tags using babel
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: false
        }
      })
    ]
  };
}
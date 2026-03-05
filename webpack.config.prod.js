var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');


module.exports = {
  mode: 'production',
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({ //<--key to reduce React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  devServer: {
    historyApiFallback: true,
    static: './public'
  }
};
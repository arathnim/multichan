/* eslint-disable import/no-extraneous-dependencies,global-require */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const nodeEnv = process.env.NODE_ENV || 'development'
const config = {
  appTitle: 'title',
  mount: 'main',
  devMode: nodeEnv.startsWith('dev'),
  publicDir: path.resolve(__dirname, 'public'),
}

const rules = [
  {
    test: /node_modules[\\/].*\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
    ],
  },
  {
    exclude: /node_modules/,
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
    ],
  },
  {
    exclude: /node_modules/,
    test: /\.sass$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
]

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: false,
    title: config.appTitle,
    appMountId: config.mount,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  })
]

const stats = {
  chunks: false,
  modules: false,
  colors: true,
}

const clientConfig = {
  name: 'client',
  mode: nodeEnv,
  entry: { main: './src/index' },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: config.publicDir,
    filename:  '[name].bundle.js',
  },
  module: {
    rules,
  },
  plugins,
  stats,
  devServer: {
    contentBase: config.publicDir,
    stats,
  },
}

module.exports = clientConfig

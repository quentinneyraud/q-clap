const rimraf = require('rimraf')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// paths
const src = path.join(__dirname, 'src')
const example = path.join(__dirname, 'example')
const dist = path.join(__dirname, 'umd')

// env
const env = process.env.NODE_ENV || 'development'

// stats
const stats = {
  assets: true,
  chunks: false,
  children: false,
  version: false,
  modules: false,
  builtAt: false,
  colors: true,
  hash: false,
  timings: false,
  entrypoints: false
}

/**
 *
 * Dev task (webpack-dev-server + HMR on exmaple folder)
 *
 */
if (env === 'development') {
  module.exports = {
    target: 'web',
    stats,
    devServer: {
      port: 4000
    },
    entry: path.join(example, 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.svg$/,
        loader: 'raw-loader'
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(example, 'index.html')
      })
    ]
  }
}

/**
 *
 * Build task (build all files)
 *
 */
if (env === 'production') {
  rimraf.sync(dist)

  const configs = [{
    minified: false,
    polyfilled: false
  }, {
    minified: true,
    polyfilled: false
  }, {
    minified: false,
    polyfilled: true
  }, {
    minified: true,
    polyfilled: true
  }]

  const webpackConfigs = configs.map((config, index) => {
    let filename = 'q-clap'
    if (config.polyfilled) filename += '.polyfilled'
    if (config.minified) filename += '.min'
    filename += '.js'

    const webpackConfig = {
      target: 'web',
      stats,
      entry: path.join(src, 'index.js'),
      output: {
        library: 'q-clap',
        libraryTarget: 'umd',
        path: dist,
        filename
      },
      module: {
        rules: [{
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            autoFix: true
          }
        }, {
          test: /\.svg$/,
          loader: 'raw-loader'
        }]
      }
    }

    if (config.polyfilled) {
      webpackConfig.module.rules.push({
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      })
    }

    if (config.minified === false) {
      webpackConfig.optimization = {
        minimize: false
      }
    }

    return webpackConfig
  })

  module.exports = webpackConfigs
}

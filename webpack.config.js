/* eslint-disable no-undef */
const PreloadWebpackPlugin = require('preload-webpack-plugin')
// if (process.env.NODE_ENV === 'production') {}
module.exports = {
  // ... other options
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as (entry) {
        if (/\.css$/.test(entry)) return 'style'
        if (/\.woff$/.test(entry)) return 'font'
        if (/\.png$/.test(entry)) return 'image'
        if (/\.jpg$/.test(entry)) return 'image'
        return 'script'
      }
    }),
    // short-circuits all Vue.js warning code
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // minify with dead-code elimination
      new webpack.optimize.UglifyJsPlugin()])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          }
        }
      ]
    }
  ]
}

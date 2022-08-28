const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.loaders.prepend('erb', {
  test: /\.erb$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [{
    loader: 'rails-erb-loader',
    options: {
      runner: (/^win/.test(process.platform) ? 'ruby ' : '') + 'bin/rails runner'
    }
  }]
})

environment.loaders.append('css', {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
})

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default']
}))

environment.loaders.append('expose', {
  test: require.resolve('jquery'),
  use: [{
    loader: 'expose-loader',
    options: '$'
  }, {
    loader: 'expose-loader',
    options: 'jQuery',
  }]
})

environment.config.merge({
  devtool: false
});

module.exports = environment

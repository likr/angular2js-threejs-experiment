var path = require('path')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devtool: '#inline-source-map'
}

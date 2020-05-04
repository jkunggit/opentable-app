const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index_bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },     
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

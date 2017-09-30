var DefinePlugin = require('webpack').DefinePlugin;
var ProvidePlugin = require('webpack').ProvidePlugin;
var optimize = require('webpack').optimize;

var definePlugins = new DefinePlugin({
  TEST: process.env.NODE_ENV === 'test'
});
var providePlugins = new ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'windows.jQuery': 'jquery',
})

var config = {
  context: __dirname + '/assets/js/angular',
  entry: './index.js',
  output: {
    path: __dirname + '/assets/js/angular',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
			test : /\.css$/,
			loader : "style-loader!css-loader"
		}, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'ng-annotate!babel'
    }, {
      test: /\.(jpe?g|png|gif)$/,
      exclude: /(node_modules)/,
      loader: 'url?limit=10000'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url'
    }]
  },
  plugins: [
    definePlugins,
    providePlugins
  ],
  resolve: {
    extensions: ['', '.js', '.css']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.output.path = __dirname + '/build';
  config.plugins.push(new optimize.UglifyJsPlugin());
}

module.exports = config;
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MergeIntoSingle = require('webpack-merge-and-include-globally');

module.exports = () => {
	const env = dotenv.config().parsed;
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});

	return {
		context: __dirname,
		entry: [
			'babel-polyfill',
			'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8081',
			'webpack/hot/only-dev-server',
			'./js/ClientApp.jsx'
		],
		devtool: 'cheap-eval-source-map',
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js',
			publicPath: '/public/'
		},
		devServer: {
			hot: true,
			publicPath: '/public/',
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
			}
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		stats: {
			colors: true,
			reasons: true,
			chunks: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.DefinePlugin(envKeys),
			new MergeIntoSingle({
				files: {
					'recruitme-vendor.js': ['./public/js/*']
				}
			})
		],
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.jsx?$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				},
				{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
				{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				}
			]
		}
	};
};

const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	entry: './index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	target: 'node',
	externals: [nodeExternals()],
}

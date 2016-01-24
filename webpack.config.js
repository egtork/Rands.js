module.exports = {
	entry: './lib/rands.js',
	output: {
		path: __dirname,
		filename: 'rands.js'
	},
	module: {
		loaders: [
			{ test: require.resolve('./lib/rands'), loader: 'expose?Rands' }
		]
	}
};

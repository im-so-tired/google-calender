const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		runtimeChunk: 'single',
		// splitChunks:{
		// 	chunks: "all"
		// },
	}

	if (isProd) {
		config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
	}

	return config
}
const styleModulesLoader = loader => {
	const config = [
		isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				modules: true,
			},
		},
	]

	if (loader) {
		config.push(loader)
	}

	return config
}
module.exports = {
	mode: isDev ? 'development' : 'production',
	context: path.resolve(__dirname, 'src'),
	entry: './index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'static/js/[name].[hash].js',
		clean: true,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		historyApiFallback: true,
	},
	devtool: isDev ? 'source-map' : false,
	optimization: optimization(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: styleModulesLoader(),
				include: /\.module\.css$/,
			},
			{
				test: /\.css$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
				],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.scss$/,
				use: styleModulesLoader('sass-loader'),
				include: /\.module\.scss$/,
			},
			{
				test: /\.scss$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
				exclude: /\.module\.scss$/,
			},
			{
				test: /\.(js|ts)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			linkType: 'text/css',
			filename: './static/css/[name].[hash].css',
		}),
		new MomentLocalesPlugin({
			localesToKeep: ['es-us', 'ru'],
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@/common': path.resolve(__dirname, 'src/components/common'),
			'@/pages': path.resolve(__dirname, 'src/components/pages'),
			'@/ui': path.resolve(__dirname, 'src/components/ui'),
			'@': path.resolve(__dirname, 'src'),
		},
	},
}

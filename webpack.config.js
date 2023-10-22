const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Files to watch for
    entry: './src/js/index.js',

    // Bundle/build output directory
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js',
    },

    // Plugins
    plugins: [
        // new HtmlWebpackPlugin({
        //     hash: true,
        //     title : 'Live Reload - Webpack',
        //     template : './src/index.html'
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src' }
            ]
        })
    ],

    // Set node modules to use for various file types
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset'
            }
        ]
    },

    // Development server set-up - define static assets directory and paths
    devServer: {
        open: true,
        hot: true, // disable hot reload for plain HTML/CSS/JS development
        compress: true,
        static: {
            directory: path.join(__dirname, 'src'),
            publicPath: '/'
        }
    }
}

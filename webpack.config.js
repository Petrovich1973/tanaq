const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Files to watch for
    entry: './src/js/script.js',

    // Bundle/build output directory
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/script.js',
    },

    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title : 'Live Reload - Webpack',
            template : './src/index.html'
        })
    ],

    // Set node modules to use for various file types
    module: {
        rules: [
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
        hot: false, // disable hot reload for plain HTML/CSS/JS development
        compress: true,
        static: {
            directory: path.join(__dirname, 'src'),
            publicPath: '/'
        }
    }
}

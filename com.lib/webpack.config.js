var path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            use: ['style-loader', 'url-loader?limite=10'],
        }, {
            test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            use: ['url-loader?limit:10000'],
        }]
    }
};
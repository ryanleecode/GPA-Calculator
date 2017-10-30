const path = require('path');

module.exports = {
    entry: './app/src/app.js',
    output: {
        path: path.resolve(__dirname, 'app/bin'),
        publicPath: "/bin/",
        filename: 'bundle.js',
    },
    resolve: {
        alias: { }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map'
};

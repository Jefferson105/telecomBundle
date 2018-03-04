const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NodemonPlugin = require("nodemon-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

process.noDeprecation = true;

module.exports = {
    entry: "./src/js/index.jsx",
    output: {
        path: path.join(__dirname, "public", "js"),
        filename: "index.js",
        sourceMapFilename: "index.map"
    },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "stage-0", "react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [require("autoprefixer")]
                    }}, "sass-loader"]
            },
            {
                test: /\.scss/,
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [require('autoprefixer')]
                    }}, 'sass-loader']
            }
        ]
    },
    plugins: [
        new NodemonPlugin({
            watch: path.resolve("./index.js"),
            ignore: ["*.js.map"],
            verbose: true,
            script: "./index.js"
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            proxy: "http://localhost:8080/"
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: { ecma: 8 }
        })
    ]
}
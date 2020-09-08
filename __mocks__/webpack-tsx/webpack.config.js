const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: "web",
    // Switch the mode between development | production | none
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        // eslint-disable-next-line no-undef
        app: path.join(__dirname, "src", "index.tsx"),
    },
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: "index.html",
            inject: true,
            // eslint-disable-next-line no-undef
            template: path.resolve(__dirname, "index.html"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    /* The dev server options are optional switch the port or the base
        in case your port is unavailable */
    devServer: {
        contentBase: "./",
        port: 4000,
    },
};

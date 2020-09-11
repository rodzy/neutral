const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        // eslint-disable-next-line no-undef
        app: path.join(__dirname, "../src", "index.tsx"),
    },
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "../", "dist"),
        filename: "bundle.js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: "index.html",
            inject: true,
            // eslint-disable-next-line no-undef
            template: path.resolve(__dirname, "../", "index.html"),
        }),
    ],
    module: {
        rules: [
            <%_ if (typescript) { _%>
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        <% _ } else { _%>
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
        },
        <%_ } _%>
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
    <%_ if (typescript) { _%>
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    <%_ } else { _%>
        resolve: {
            extensions: [".jsx", ".js"],
        },
    <%_ } _%>
};

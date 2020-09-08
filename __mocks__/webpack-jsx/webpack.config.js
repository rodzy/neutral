const path = require("path");

module.exports = {
    target: "web",
    // Switch the mode between development | production | none
    mode: "development",
    entry: {
        // eslint-disable-next-line no-undef
        app: path.join(__dirname, "src", "index.js"),
    },
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?/,
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
        extensions: [".js", ".jsx", ".cjs"],
    },
    /* The dev server options are optional switch the port or the base
        in case your port is unavailable */
    devServer: {
        contentBase: "./",
        port: 4000,
    },
};
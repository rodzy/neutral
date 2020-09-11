const { merge } = require("webpack-merge");
//@ts-ignore
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",
    /* The dev server options are optional switch the port or the base
        in case your port is unavailable */
    devServer: {
        contentBase: "./",
        port: 4000,
    },
});

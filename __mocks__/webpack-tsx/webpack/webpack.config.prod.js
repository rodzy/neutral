const { merge } = require("webpack-merge");
//@ts-ignore
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
    mode: "production",
    devtool: "source-map",
});

const globalCssRe = [/(?<!\.module)\.css$/, /(?<!\.module)\.(scss|sass)$/]
const globalCssModulesRe = [/\.module\.css$/, /\.module\.(scss|sass)$/]

module.exports = { globalCssRe, globalCssModulesRe }

# next-global-css

[![npm](https://img.shields.io/npm/v/next-global-css.svg?style=flat-square&labelColor=111)][npm] [![node](https://img.shields.io/badge/nextjs-10+-007ecc?style=flat-square&labelColor=111)][nextjs]

A preset for [nextjs][nextjs] allowing using 3d party libraries with global css.

> ⚠️ Be careful, this solution can be unstable due to [nextjs][nextjs] updates.

## 🏗 Compatible

Current version works only for 10th version of [nextjs][nextjs] or higher.

## ☄️ Install and usage

**Installation:**

```sh
npm i -PE next-global-css
```

**Configure:**

```js
const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig({
  /* Next.js config options here */
})
```

**If your webpack configuration is already customized:**

```js
const { patchWebpackConfig } = require('next-global-css')

const nextConfig = {
  /* config options here */
  /* your already customized webpack option */
  webpack: (config, options) => {
    patchWebpackConfig(config, options)
  },
}
```

**Allow css-modules from node-modules:**

```js
const { patchWebpackConfig } = require('next-global-css')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    patchWebpackConfig(config, options)

    if (options.isServer) {
      config.externals = webpackNodeExternals({
        // Uses list to add this modules for server bundle and process.
        allowlist: [/design-system/],
      })
    }

    return config
  },
}
```

## 📜 License

Project is [MIT licensed](https://github.com/yarastqt/next-global-css/blob/master/license.md).

[nextjs]: https://nextjs.org/
[npm]: https://www.npmjs.com/package/next-global-css

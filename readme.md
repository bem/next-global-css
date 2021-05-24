# next-global-css

A preset for [nextjs][nextjs] allowing using 3d party libraries with global css.

> ⚠️ Be careful, this solution can be unstable due to [nextjs][nextjs] updates.

## 🏗 Compatible

Current version works only for 10th version of [nextjs][nextjs].

## ☄️ Install and usage

**Installation:**

```sh
npm i -DE next-global-css
```

**Configure:**

```js
const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig({
  /* Next.js config options here */
})
```

## 📜 License

Project is [MIT licensed](https://github.com/yarastqt/next-global-css/blob/master/license.md).

[nextjs]: https://nextjs.org/

import BaseDocument, { Html, Head, Main, NextScript } from 'next/document'
import '3d-party-library/component'

export default class Document extends BaseDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

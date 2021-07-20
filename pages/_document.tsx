import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Free Lululemon Restock Alerts | SMS | Email</title>
          <meta
            name="description"
            content="Track your favorite Lululemon gear and be the first to know when they're back in stock. Receive alerts directly via SMS or Email."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
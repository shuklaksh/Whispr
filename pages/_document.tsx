import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          
          {/* You can also include other favicons, such as PNG or SVG */}
          <link rel="icon" type="image/png" href="/favicon.png" />
          
          {/* Meta Tags */}
          <meta name="description" content="Your web app description" />
          
          {/* Title can be set globally here */}
          <title>Whispr</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

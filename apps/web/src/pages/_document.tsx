/* eslint-disable @next/next/no-document-import-in-page */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@retrobox/theme"

type Props = {};

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Retrobox | A small tool for collecting retro items" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
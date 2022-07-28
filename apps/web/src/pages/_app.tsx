import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "@retrobox/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

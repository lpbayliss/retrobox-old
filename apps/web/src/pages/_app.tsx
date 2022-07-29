import { ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";

import theme from "@retrobox/theme";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import { getMessages } from "../i18n";

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <IntlProvider
      locale={String(locale)}
      messages={getMessages(String(locale))}
    >
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </IntlProvider>
  );
}

export default MyApp;

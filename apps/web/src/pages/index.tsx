import type { NextPage } from "next";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";

const Index: NextPage = () => {
  const intl = useIntl();

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FormattedMessage id="HELLO_WORLD" />
      </main>
      <footer></footer>
    </div>
  );
};

export default Index;

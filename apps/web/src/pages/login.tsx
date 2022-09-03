import { Button, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "../api";
import { Card } from "../components/card";

const Login: NextPage = () => {
  const router = useRouter();
  const [me, setMe] = useState<any>(null);

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" h="100vh">
        <Card mx="auto" my="auto" maxW="xl" minW="xl" pb="14">
          <Button
            disabled={!router.query.token}
            onClick={async () =>
              await api.sendToken(String(router.query.token))
            }
          >
            Login
          </Button>
          <Button
            disabled={!!me}
            onClick={async () => {
              const data = await api.getMe(String(router.query.token));
              setMe(data);
            }}
          >
            Get Me
          </Button>
          {JSON.stringify(me)}
        </Card>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default Login;

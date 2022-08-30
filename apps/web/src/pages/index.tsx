import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import api from "../api";
import { Card } from "../components/card";
import {
  CreateBoxForm,
  ICreateBoxFormInputs,
} from "../components/create-box-form";

const Index: NextPage = () => {
  const router = useRouter();

  const mutation = useMutation((input: { name: string }) => {
    return api.createBox(input.name);
  });

  const handleOnSubmit = async (input: ICreateBoxFormInputs) => {
    mutation.mutate(input, {
      onSuccess: (data) => {
        router.push(`/box/${data.data.id}`);
      },
    });
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" h="100vh">
        <Card mx="auto" my="auto" maxW="xl" minW="xl" pb="14">
          <Box mx="auto" fontSize="6xl">
            📦
          </Box>
          <Heading size="4xl" pb="4" mx="auto">
            <FormattedMessage id="RETROBOX" />
          </Heading>
          <Text mx="auto" maxW="xs" pb="4" color="grey" fontSize="sm">
            <FormattedMessage id="APP_DESCRIPTION" />
          </Text>
          <CreateBoxForm mx="auto" minW="xs" onSubmit={handleOnSubmit} />
        </Card>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default Index;

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import api, { FetchDropResponseData } from "../../api";
import { Card } from "../../components/card";

type Props = {
  dropId: string;
  dropData: {
    id: string;
    createdAt: Date;
    items: { message: string; author: string | null }[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { data } = await api.getDrop(context.params!.id as string);
  return { props: { dropId: context.params!.id as string, dropData: data } };
};

const DropPage: NextPage<Props> = (props) => {
  const { data: drop } = useQuery(
    ["drop", props.dropId],
    async () => (await api.getDrop(props.dropId)).data,
    {
      initialData: props.dropData,
    }
  );

  return (
    <div>
      <Head>
        <title>View Drop</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" h="100vh">
        <VStack mx="auto" my="auto" maxW="xl" minW="xl" spacing="4">
          <Card w="full" py="14">
            <Box w="sm" mx="auto">
              <Heading as="h2" pb="6">
                Drop for {new Date(drop.createdAt).toDateString()}
              </Heading>
              {drop.items.map((item: any, index: number) => (
                <Text key={`item-${index}`}>
                  {item.author ? item.author : "Anonymous"}: {item.message}
                </Text>
              ))}
            </Box>
          </Card>
        </VStack>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default DropPage;

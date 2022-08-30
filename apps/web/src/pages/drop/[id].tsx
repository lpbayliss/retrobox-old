import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormattedDate } from "react-intl";
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
  const { asPath } = useRouter();

  const { data: drop } = useQuery(
    ["drop", props.dropId],
    async () => (await api.getDrop(props.dropId)).data,
    {
      initialData: props.dropData,
    }
  );

  const handleCopyLink = () =>
    navigator.clipboard.writeText(window.location.origin + asPath);

  return (
    <div>
      <Head>
        <title>View Drop</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" h="100vh">
        <VStack
          mx="auto"
          my="auto"
          minW={["sm", null, "2xl"]}
          spacing="4"
        >
          <Card flexDir="row" w="full" py="8" alignItems="center">
            <Box>
              <Heading as="h1" mb="2">
                Drop
              </Heading>
              <Text as="h2" fontStyle="italic" color="gray.600" size="xs">
                Dropped on{" "}
                <FormattedDate value={drop.createdAt} dateStyle="full" />
              </Text>
            </Box>
            <Button onClick={handleCopyLink} ml="auto">
              Copy Link
            </Button>
          </Card>

          {drop.items.map((item: any, index: number) => (
            <Card w="full" key={`item-${index}`}>
              <Text fontSize="xl">{`"${item.message}"`}</Text>
              <Text
                fontStyle="italic"
                color="gray.600"
                alignSelf="flex-end"
              >{`- ${item.author ? item.author : "Anonymous"}`}</Text>
            </Card>
          ))}
        </VStack>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default DropPage;

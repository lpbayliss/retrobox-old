import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { getDrop } from "@retrobox/api";
import { FetchDropResponse } from "@retrobox/types";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormattedDate } from "react-intl";

import { Card } from "../../components/card";

type Props = {
  initialDropData: FetchDropResponse;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const data = await getDrop(String(context.params!.id));
  return { props: { initialDropData: data  } };
};

const DropPage: NextPage<Props> = (props) => {
  const { asPath } = useRouter();

  const { data: { data: drop } } = useQuery(
    ["drop", props.initialDropData.data.id],
    async () => await getDrop(props.initialDropData.data.id),
    {
      initialData: props.initialDropData,
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
        <VStack minW={["sm", null, "2xl"]} mx="auto" my="auto" spacing="4">
          <Card flexDir="row" w="full" py="8" alignItems="center">
            <Box>
              <Heading as="h1" mb="2">
                Drop
              </Heading>
              <Text as="h2" color="gray.600" fontStyle="italic" size="xs">
                Dropped on
                <FormattedDate value={drop.createdAt} dateStyle="full" />
              </Text>
            </Box>
            <Button ml="auto" onClick={handleCopyLink}>
              Copy Link
            </Button>
          </Card>

          {drop &&
            drop.items.map((item: any, index: number) => (
              <Card w="full" key={`item-${index}`}>
                <Text fontSize="xl">{`"${item.message}"`}</Text>
                <Text
                  alignSelf="flex-end"
                  color="gray.600"
                  fontStyle="italic"
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

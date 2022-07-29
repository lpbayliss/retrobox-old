import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getDrop } from "../../api";

type Props = { dropId: string; dropData: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { data } = await getDrop(context.params!.id as string);
  return { props: { dropId: context.params!.id as string, dropData: data } };
};

const DropPage: NextPage<Props> = (props) => {
  const { data: drop } = useQuery(
    ["drop", props.dropId],
    async () => (await getDrop(props.dropId)).data,
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
      <Box as="main">
        <Text>This drop was created on {drop.createdAt}</Text>
        {drop.items.map((item: any, index: number) => (
          <Text key={`item-${index}`}>
            {item.author ? item.author : "Anonymous"}: {item.message}
          </Text>
        ))}
      </Box>
      <footer></footer>
    </div>
  );
};

export default DropPage;

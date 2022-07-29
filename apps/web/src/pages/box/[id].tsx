import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import api from "../../api";

type Props = { boxId: string; boxData: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const boxData = (await api.getBox(context.params!.id as string)).data;
  return { props: { boxId: context.params!.id as string, boxData } };
};

const BoxPage: NextPage<Props> = (props) => {
  const { data: box } = useQuery(
    ["box", props.boxId],
    async () => (await api.getBox(props.boxId)).data,
    {
      initialData: props.boxData,
    }
  );

  return (
    <div>
      <Head>
        <title>View Box | {box.name}</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="main">
        <Text>{box.name}</Text>
        <Text>{box.itemCount} items in this box</Text>
        {box.latestDrop && (
          <Text>
            The most recent{" "}
            <Link href={`/drop/${box.latestDrop.id}`}>
              <a>drop</a>
            </Link>{" "}
            was made on {box.latestDrop.createdAt} with{" "}
            {box.latestDrop.itemCount} items
          </Text>
        )}
        {box.allDrops.map((drop: any) => (
          <Text key={drop.id}>
            A{" "}
            <Link href={`/drop/${drop.id}`}>
              <a>drop</a>
            </Link>{" "}
            was made on {drop.createdAt} with {drop.itemCount} items
          </Text>
        ))}
      </Box>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

import { Box, Button, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import api from "../../api";
import CreateItemForm, {
  ICreateItemFormInputs,
} from "../../components/create-item-form/create-item-form.component";

type Props = { boxId: string; boxData: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const boxData = (await api.getBox(context.params!.id as string)).data;
  return { props: { boxId: context.params!.id as string, boxData } };
};

const BoxPage: NextPage<Props> = (props) => {
  const queryClient = useQueryClient();

  const { data: box } = useQuery(
    ["box", props.boxId],
    async () => (await api.getBox(props.boxId)).data,
    {
      initialData: props.boxData,
    }
  );

  const addItemMutation = useMutation(
    (newItem: { message: string; author?: string }) => {
      return api.addItem(box.id, newItem.message, newItem.author);
    }
  );

  const createDropMutation = useMutation((boxId: string) => {
    return api.createDrop(boxId);
  });

  const handleOnSubmit = async (input: ICreateItemFormInputs) => {
    addItemMutation.mutate(input, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", props.boxId]);
      },
    });
  };

  const handleCreateDrop = async () => {
    createDropMutation.mutate(props.boxId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", props.boxId]);
      },
    });
  };

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
        <CreateItemForm onSubmit={handleOnSubmit} />
        {addItemMutation.isLoading && <Text>Adding item to box...</Text>}
        {addItemMutation.isSuccess && <Text>Item added to box...</Text>}
      </Box>
      <Box>
        <Button onClick={handleCreateDrop}>Create Drop</Button>
        {createDropMutation.isLoading && <Text>Creating drop...</Text>}
        {createDropMutation.isSuccess && <Text>Drop created</Text>}
        {createDropMutation.isError && <Text>Problem creating a drop</Text>}
      </Box>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

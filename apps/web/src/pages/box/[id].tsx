import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useControllableState,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import api from "../../api";
import { Card } from "../../components/card";
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
  const toast = useToast();
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
        toast({
          title: "Item Added",
          description: "We've added a new item for you",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
      onError: () => {
        toast({
          title: "Failed to add item",
          description: "Something went wrong trying to add an item",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
    });
  };

  const handleCreateDrop = async () => {
    createDropMutation.mutate(props.boxId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", props.boxId]);
        toast({
          title: "Drop Created",
          description: "We've created a new drop for you",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
      onError: () => {
        toast({
          title: "Failed to create drop",
          description: "Something went wrong trying to create a drop",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
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
      <Flex as="main" h="100vh">
        <VStack mx="auto" my="auto" maxW="xl" minW="xl" spacing="4">
          <Card w="full" py="14">
            <VStack align={"flex-start"} w="sm" mx="auto">
              <Heading as="h1">{box.name}</Heading>
              <Text color="grey" fontSize="sm">
                {box.itemCount} items in this box
              </Text>
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
              <Divider />
              <Button
                isLoading={createDropMutation.isLoading}
                onClick={handleCreateDrop}
                w="full"
              >
                Create Drop
              </Button>
            </VStack>
          </Card>
          <Card w="full" py="14">
            <Box w="sm" mx="auto">
              <Heading as="h2" size="md" mb="3">
                Add Item
              </Heading>
              <CreateItemForm onSubmit={handleOnSubmit} />
            </Box>
          </Card>
          {box.allDrops.length && (
            <Card w="full" py="14">
              <Box w="sm" mx="auto">
                <Heading as="h2" size="md" mb="3">
                  Previous Drops
                </Heading>
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
            </Card>
          )}
        </VStack>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

import * as react from "@chakra-ui/react";
import { Box, FetchBoxResponse } from "@retrobox/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { FormattedDate, useIntl } from "react-intl";

import { addItem, createDrop, fetchBox } from "../../api";
import { Card } from "../../components/card";
import CreateItemForm, {
  ICreateItemFormInputs,
} from "../../components/create-item-form/create-item-form.component";

type Props = { initialDropData: FetchBoxResponse };

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
}) => {
  const data = await fetchBox(String(params!.id), req.headers);
  return { props: { initialDropData: data } };
};

const BoxPage: NextPage<Props> = (props) => {
  const { asPath } = useRouter();
  const intl = useIntl();
  const toast = react.useToast();
  const queryClient = useQueryClient();

  const {
    data: { data: box },
  } = useQuery(
    ["box", props.initialDropData.data.id],
    async () => await fetchBox(props.initialDropData.data.id),
    {
      initialData: props.initialDropData,
    }
  );

  const addItemMutation = useMutation(
    (newItem: { message: string; author?: string }) => {
      return addItem({
        id: box.id,
        message: newItem.message,
        author: newItem.author,
      });
    }
  );

  const createDropMutation = useMutation((id: string) => {
    return createDrop(id);
  });

  const handleOnSubmit = async (input: ICreateItemFormInputs) => {
    addItemMutation.mutate(input, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", box.id]);
        toast({
          title: intl.formatMessage({ id: "ITEM_ADDED_SUCCESS_TITLE" }),
          description: intl.formatMessage({ id: "ITEM_ADDED_SUCCESS_MESSAGE" }),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
      onError: () => {
        toast({
          title: intl.formatMessage({ id: "ITEM_ADDED_FAILED_TITLE" }),
          description: intl.formatMessage({ id: "ITEM_ADDED_FAILED_MESSAGE" }),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
    });
  };

  const handleCreateDrop = async () => {
    createDropMutation.mutate(box.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", box.id]);
        toast({
          title: intl.formatMessage({ id: "DROP_CREATED_SUCCESS_TITLE" }),
          description: intl.formatMessage({
            id: "DROP_CREATED_SUCCESS_MESSAGE",
          }),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
      onError: () => {
        toast({
          title: intl.formatMessage({ id: "DROP_CREATED_FAILED_TITLE" }),
          description: intl.formatMessage({
            id: "DROP_CREATED_FAILED_MESSAGE",
          }),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      },
    });
  };

  const handleCopyLink = () =>
    navigator.clipboard.writeText(window.location.origin + asPath);

  return (
    <div>
      <Head>
        <title>View Box | {box!.name}</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <react.Flex as="main" h="100vh">
        <react.VStack mx="auto" my="auto" spacing="4">
          {/* TITLE */}
          <Card flexDir="row" w="full" py="8">
            <react.Heading as="h1">{box!.name}</react.Heading>
            <react.Button ml="auto" onClick={handleCopyLink}>
              Copy Link
            </react.Button>
          </Card>

          <react.Flex direction={["column", null, null, "row"]} gap="4">
            {/* ITEMS */}
            <Card w="full" py="6" gap="8">
              <react.Box w="sm" mx="auto">
                <react.Heading as="h2" mb="3" size="lg">
                  Box
                </react.Heading>
                <react.Text color="grey" fontSize="sm">
                  {box!.itemCount} item(s) in this box currently
                </react.Text>
              </react.Box>
              <react.Box w="sm" mx="auto">
                <react.Heading as="h3" mb="3" size="md">
                  Add Item
                </react.Heading>
                <CreateItemForm onSubmit={handleOnSubmit} />
              </react.Box>
            </Card>

            {/* DROPS */}
            <Card w="full" py="6" gap="8">
              <react.VStack align="start" gap="1" w="sm" mx="auto">
                <react.Tooltip
                  p="3"
                  bg="gray.700"
                  aria-label={intl.formatMessage({ id: "BOX_EXPLANATION" })}
                  hasArrow
                  label={intl.formatMessage({ id: "BOX_EXPLANATION" })}
                  placement="right"
                >
                  <react.Heading as="h2" mb="3" size="lg">
                    Drops
                  </react.Heading>
                </react.Tooltip>

                {box!.latestDrop && (
                  <>
                    <react.Heading as="h3" mb="3" size="md">
                      Most Recent
                    </react.Heading>
                    <react.Text>
                      The most recent
                      <NextLink href={`/drop/${box!.latestDrop.id}`}>
                        <react.Link>drop</react.Link>
                      </NextLink>
                      was on
                      <FormattedDate
                        value={box!.latestDrop.createdAt}
                        dateStyle="full"
                      />
                      with {box!.latestDrop.itemCount} items
                    </react.Text>
                  </>
                )}
                {box!.itemCount && (
                  <react.Text>
                    You can can currently drop {box!.itemCount} item(s)
                  </react.Text>
                )}
                {!box!.itemCount && (
                  <react.Text>There are no items to drop, add some?</react.Text>
                )}
                <react.Button
                  w="full"
                  isDisabled={!box!.itemCount}
                  isLoading={createDropMutation.isLoading}
                  onClick={handleCreateDrop}
                >
                  Create Drop
                </react.Button>
              </react.VStack>
              <react.Box w="sm" mx="auto">
                <react.Heading as="h2" mb="3" size="md">
                  All Drops
                </react.Heading>
                {!!box!.allDrops.length && (
                  <react.Table>
                    <react.Thead>
                      <react.Tr>
                        <react.Th>Dropped on</react.Th>
                        <react.Th isNumeric>Item Count</react.Th>
                        <react.Th>Link</react.Th>
                      </react.Tr>
                    </react.Thead>
                    <react.Tbody>
                      {box!.allDrops.map((drop: any) => (
                        <react.Tr key={drop.id}>
                          <react.Td>
                            <FormattedDate
                              value={drop.createdAt}
                              dateStyle="full"
                            />
                          </react.Td>
                          <react.Td isNumeric>{drop.itemCount}</react.Td>
                          <react.Td>
                            <NextLink href={`/drop/${drop.id}`} passHref>
                              <react.Link>View</react.Link>
                            </NextLink>
                          </react.Td>
                        </react.Tr>
                      ))}
                    </react.Tbody>
                    <react.Tfoot>
                      <react.Tr>
                        <react.Th>Dropped on</react.Th>
                        <react.Th isNumeric>Item Count</react.Th>
                        <react.Th>Link</react.Th>
                      </react.Tr>
                    </react.Tfoot>
                  </react.Table>
                )}
                {!box!.allDrops.length && (
                  <react.Text>You haven&apos;t dropped anything yet</react.Text>
                )}
              </react.Box>
            </Card>
          </react.Flex>
        </react.VStack>
      </react.Flex>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

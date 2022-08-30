import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { FormattedDate, useIntl } from "react-intl";
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
  const { asPath } = useRouter();
  const intl = useIntl();
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
    createDropMutation.mutate(props.boxId, {
      onSuccess: () => {
        queryClient.invalidateQueries(["box", props.boxId]);
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
        <title>View Box | {box.name}</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" h="100vh">
        <VStack mx="auto" my="auto" spacing="4">
          {/* TITLE */}
          <Card flexDir="row" w="full" py="8">
            <Heading as="h1">{box.name}</Heading>
            <Button onClick={handleCopyLink} ml="auto">
              Copy Link
            </Button>
          </Card>

          <Flex flexDir={["column", null, null, "row"]} gap="4">
            {/* ITEMS */}
            <Card w="full" py="6" gap="8">
              <Box w="sm" mx="auto">
                <Heading as="h2" size="lg" mb="3">
                  Box
                </Heading>
                <Text color="grey" fontSize="sm">
                  {box.itemCount} item(s) in this box currently
                </Text>
              </Box>
              <Box w="sm" mx="auto">
                <Heading as="h3" size="md" mb="3">
                  Add Item
                </Heading>
                <CreateItemForm onSubmit={handleOnSubmit} />
              </Box>
            </Card>

            {/* DROPS */}
            <Card w="full" py="6" gap="8">
              <VStack w="sm" mx="auto" gap="1" align="start">
                <Tooltip
                  bg="gray.700"
                  p="3"
                  hasArrow
                  placement="right"
                  label={intl.formatMessage({ id: "BOX_EXPLANATION" })}
                  aria-label={intl.formatMessage({ id: "BOX_EXPLANATION" })}
                >
                  <Heading as="h2" size="lg" mb="3">
                    Drops
                  </Heading>
                </Tooltip>

                {box.latestDrop && (
                  <>
                    <Heading as="h3" size="md" mb="3">
                      Most Recent
                    </Heading>
                    <Text>
                      The most recent{" "}
                      <NextLink href={`/drop/${box.latestDrop.id}`}>
                        <Link>drop</Link>
                      </NextLink>{" "}
                      was on{" "}
                      <FormattedDate
                        value={box.latestDrop.createdAt}
                        dateStyle="full"
                      />{" "}
                      with {box.latestDrop.itemCount} items
                    </Text>
                  </>
                )}
                {box.itemCount && (
                  <Text>
                    You can can currently drop {box.itemCount} item(s)
                  </Text>
                )}
                {!box.itemCount && (
                  <Text>There are no items to drop, add some?</Text>
                )}
                <Button
                  isLoading={createDropMutation.isLoading}
                  onClick={handleCreateDrop}
                  isDisabled={!box.itemCount}
                  w="full"
                >
                  Create Drop
                </Button>
              </VStack>
              <Box w="sm" mx="auto">
                <Heading as="h2" size="md" mb="3">
                  All Drops
                </Heading>
                {!!box.allDrops.length && (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Dropped on</Th>
                        <Th isNumeric>Item Count</Th>
                        <Th>Link</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {box.allDrops.map((drop: any) => (
                        <Tr key={drop.id}>
                          <Td>
                            <FormattedDate
                              value={drop.createdAt}
                              dateStyle="full"
                            />
                          </Td>
                          <Td isNumeric>{drop.itemCount}</Td>
                          <Td>
                            <NextLink href={`/drop/${drop.id}`} passHref>
                              <Link>View</Link>
                            </NextLink>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Dropped on</Th>
                        <Th isNumeric>Item Count</Th>
                        <Th>Link</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                )}
                {!box.allDrops.length && (
                  <Text>You haven&apos;t dropped anything yet</Text>
                )}
              </Box>
            </Card>
          </Flex>
        </VStack>
      </Flex>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

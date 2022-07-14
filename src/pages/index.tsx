/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "../components/card";
import ColorModeButton from "../components/color-mode-button";
import { api } from "../lib/api";

type Props = { value: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const newBox = await api.createBox('some name')
  await api.addItemToBoxWithId(newBox.id, 'This is a new item!')
  await api.addItemToBoxWithId(newBox.id, 'This is a new item! 2')
  await api.createDumpForBoxWithId(newBox.id)
  await api.addItemToBoxWithId(newBox.id, 'This is a new item! 3')
  const box = await api.fetchBoxWithId(newBox.id);
  console.log(box)
  return { props: { value: box } };
};

const IndexPage: NextPage<Props> = ({ value }) => {
  return (
    <Flex flexDir="column">
      <Container maxW="4xl">
        <ColorModeButton />
        <Heading size="4xl" pb="none">
          Template
        </Heading>
        <Card maxW="sm" minH="md">
          <Text>This is a component</Text>
          <text>{JSON.stringify(value)}</text>
        </Card>
      </Container>
    </Flex>
  );
};

export default IndexPage;

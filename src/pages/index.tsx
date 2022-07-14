/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "../components/card";
import ColorModeButton from "../components/color-mode-button";
import { api } from "../lib/api";

type Props = { value: any };

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

/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "../components/card";
import ColorModeButton from "../components/color-mode-button";

type Props = { value: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { value: "hello" } });

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
        </Card>
      </Container>
    </Flex>
  );
};

export default IndexPage;

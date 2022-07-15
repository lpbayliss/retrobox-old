/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import ColorModeButton from "../components/color-mode-button";

const IndexPage: NextPage = () => {
  return (
    <Flex flexDir="column" minW="lg">
      <Flex margin="5">
        <Heading size="lg" pb="none">
          📦 Retrobox
        </Heading>
        <ColorModeButton marginLeft="auto" />
      </Flex>
      <Container maxW="4xl">
        <Flex py="16">
          <Heading size="4xl" pb="none" m="auto">
            📦 Retrobox 📦
          </Heading>
        </Flex>
        <Flex flexDir="column" maxW="sm" m="auto">
          <Text mb="3">Have trouble remembering all those topics for retro?</Text>
          <Text mb="3">
            Create a retro box! It act's like a suggestion box you can open up
            at your next retro.
          </Text>
          <Flex as="form">
            <Input placeholder="Name your retrobox" size="lg" mr="2" />
            <Button size="lg">Create</Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default IndexPage;

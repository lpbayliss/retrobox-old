import {
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Logo } from "../components/logo";

export type ILoginFormInputs = {
  email: string;
};

const Login: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormInputs>();

  const handleOnSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>
          Log in
        </title>
        <meta name="description" content="Log in" />
      </Head>
      <Container as="main" maxW="md" py={{ base: "12", md: "24" }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                <FormattedMessage id="LOGIN_PAGE_FORM_TITLE" />
              </Heading>
              <Text color="muted">
                <FormattedMessage id="LOGIN_PAGE_FORM_SUBTITLE" />
              </Text>
            </Stack>
          </Stack>

          <Stack as="form" spacing="6" onSubmit={handleSubmit(handleOnSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <Stack spacing="4">
                <Input
                  variant="filled"
                  id="email"
                  placeholder={intl.formatMessage({
                    id: "LOGIN_FORM_PLACEHOLDER",
                  })}
                  {...register("email", {
                    required: intl.formatMessage({
                      id: "LOGIN_FORM_ERROR_REQUIRED",
                    }),
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: intl.formatMessage({
                        id: "LOGIN_FORM_ERROR_PATTERN",
                      }),
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  <FormattedMessage id="LOGIN_FORM_SUBMIT_TEXT" />
                </Button>
              </Stack>
            </FormControl>
          </Stack>

          <Divider />

          <HStack spacing="1" justify="center">
            <Text fontSize="sm" color="muted">
              <FormattedMessage id="LOGIN_PAGE_ISSUES" />
            </Text>
            <Button variant="link" colorScheme="blue" size="sm">
              <FormattedMessage id="LOGIN_PAGE_CONTACT" />
            </Button>
          </HStack>
        </Stack>
      </Container>
      <footer></footer>
    </div>
  );
};

export default Login;

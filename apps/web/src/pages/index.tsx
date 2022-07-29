import { Button, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import api from "../api";
import {
  CreateBoxForm,
  ICreateBoxFormInputs,
} from "../components/create-box-form";

const Index: NextPage = () => {
  const router = useRouter();

  const handleOnSubmit = async (input: ICreateBoxFormInputs) => {
    const { data } = await api.createBox(input.name);
    router.push(`/box/${data.id}`);
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FormattedMessage id="HELLO_WORLD" />
        <CreateBoxForm onSubmit={handleOnSubmit} />
      </main>
      <footer></footer>
    </div>
  );
};

export default Index;

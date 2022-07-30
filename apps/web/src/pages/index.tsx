import { useMutation } from "@tanstack/react-query";
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

  const mutation = useMutation((input: { name: string }) => {
    return api.createBox(input.name);
  });

  const handleOnSubmit = async (input: ICreateBoxFormInputs) => {
    mutation.mutate(input, {
      onSuccess: (data) => {
        // router
        router.push(`/box/${data.data.id}`);
      },
    });
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

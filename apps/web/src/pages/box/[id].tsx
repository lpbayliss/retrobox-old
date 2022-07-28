import { useQuery, useQueryClient } from "@tanstack/react-query";
import { default as axios } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

const getBox = async (boxId: string) => {
  const resp = await axios({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: `/boxes/${boxId}`,
  });
  return resp.data;
};

type Props = { box: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const data = await getBox(context.params!.id as string);
  return { props: { box: data } };
};

const BoxPage: NextPage<Props> = (props) => {
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["box"],
    async () => {
      const resp = await axios({
        method: "get",
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        url: `/boxes/${props.box.id}`,
      });
      return resp.data;
    },
    { initialData: props.box }
  );

  return (
    <div>
      <Head>
        <title>Box</title>
        <meta name="description" content="Box" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{JSON.stringify(data)}</main>
      <footer></footer>
    </div>
  );
};

export default BoxPage;

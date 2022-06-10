/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import to from "await-to-js";
import { PrismaGateway } from "../../../server/gateways";

type Props = { box: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const [err, data] = await to(
    PrismaGateway.fetchBox(context.params.id as string)
  );
  if (err || !data)
    return { redirect: { permanent: false, destination: "/404" } };
  console.log(data);
  return { props: { box: data } };
};

const BoxPage: NextPage<Props> = ({ box }) => {
  return <Flex flexDir="column">{JSON.stringify(box)}</Flex>;
};

export default BoxPage;

/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps, NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import to from "await-to-js";
import { PrismaGateway } from "../../../server/gateways";

type Props = { dump: any };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const [err, data] = await to(
    PrismaGateway.fetchDump(context.params.id as string)
  );
  if (err || !data)
    return { redirect: { permanent: false, destination: "/404" } };
  return { props: { dump: data } };
};

const DumpPage: NextPage<Props> = ({ dump }) => {
  return <Flex flexDir="column">{JSON.stringify(dump)}</Flex>;
};

export default DumpPage;

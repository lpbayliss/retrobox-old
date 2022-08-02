import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const Card: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    display: "flex",
    flexDirection: "column",
    background: ["none", mode("white", "gray.900")(props)],
    boxShadow: ["none", mode("md", "none")(props)],
    padding: 6,
    borderRadius: "base",
    minW: "sm"
  }),
};

export default Card;

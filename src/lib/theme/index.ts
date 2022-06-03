import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import semanticTokens from "./semantic-tokens";
import Card from "./components/card";
import Heading from "./components/heading";

const overrides = {
  styles,
  semanticTokens,
  components: {
    Card,
    Heading
  },
};

export default extendTheme(overrides);

import { Center, Flex, FlexProps, IconButton, useColorMode } from "@chakra-ui/react";
import { faMoon, faSunBright } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorModeButton = (props: FlexProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex {...props}>
      <Center>
        <IconButton
          aria-label="toggle-color-mode"
          icon={
            colorMode === "light" ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSunBright} />
            )
          }
          onClick={toggleColorMode}
        />
      </Center>
    </Flex>
  );
};

export default ColorModeButton;

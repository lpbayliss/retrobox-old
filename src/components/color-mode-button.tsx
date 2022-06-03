import { IconButton, useColorMode } from "@chakra-ui/react";
import { faMoon, faSunBright } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
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
  );
};

export default ColorModeButton;

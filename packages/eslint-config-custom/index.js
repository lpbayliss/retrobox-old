module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["chakra-ui", "simple-import-sort"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "chakra-ui/props-order": "error",
    "chakra-ui/props-shorthand": "error",
    "chakra-ui/require-specific-component": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

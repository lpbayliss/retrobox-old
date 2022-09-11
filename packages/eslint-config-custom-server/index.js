module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "turbo", "prettier"],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

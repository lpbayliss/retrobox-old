/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@retrobox/theme"]);
const path = require("path");

const nextConfig = withTM({
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  i18n: {
    locales: ["en-AU"],
    defaultLocale: "en-AU",
  },
});

module.exports = nextConfig;

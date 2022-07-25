/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@retrobox/ui"]);
const path = require("path");

const nextConfig = withTM({
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});

module.exports = nextConfig;

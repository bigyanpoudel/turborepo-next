const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://",
    domains: ["api.lorem.space", "mercy-banner.s3.amazonaws.com"],

    deviceSizes: [400, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
});

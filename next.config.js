const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  i18n,
};

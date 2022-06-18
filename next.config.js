/** @type {import('next').NextConfig} */


/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// const { withSentryConfig } = require("@sentry/nextjs");

const i18nRoutes = require("./i18nRoutes.config");
const { i18n } = require("./next-i18next.config");

const i18nRewriteRules = Object.entries(i18nRoutes).flatMap(
  ([destination, sources]) =>
    sources.map(({ source, locale }) => ({
      destination,
      source: `/${locale}${source}`,
      locale: false,
    }))
);

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  i18n,
  async rewrites() {
    return i18nRewriteRules;
  },
  images: {
    domains: ["harrastus.content.api.hel.fi"],
  },
    webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config
  },
  // Do not upload source map files to sentry when sentry not enabled
  // sentry: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT
  //   ? {}
  //   : {
  //       disableServerWebpackPlugin: true,
  //       disableClientWebpackPlugin: true,
  //     },
};

// // For all available options, see:
// // https://github.com/getsentry/sentry-webpack-plugin#options.
// const sentryWebpackPluginOptions = {
//   silent: true, // Suppresses all logs
// };

// // Make sure adding Sentry options is the last code to run before exporting, to
// // ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
module.exports = nextConfig




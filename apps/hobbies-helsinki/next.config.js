/** @type {import('next').NextConfig} */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// const { withSentryConfig } = require("@sentry/nextjs");

const i18nRoutes = require('./i18nRoutes.config');
const { i18n } = require('./next-i18next.config');

const isProd = process.env.NODE_ENV === 'production';

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
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  i18n,
  async rewrites() {
    return i18nRewriteRules;
  },
  images: {
    domains: [
      new URL(
        process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT ??
          'harrastus.content.api.hel.fi'
      ).origin,
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }
    return config;
  },
  // Do not upload source map files to sentry when sentry not enabled
  // sentry: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT
  //   ? {}
  //   : {
  //       disableServerWebpackPlugin: true,
  //       disableClientWebpackPlugin: true,
  //     },
};

let config = nextConfig;
// Tell webpack to compile those packages
// @link https://www.npmjs.com/package/next-transpile-modules
const tmModules = [
  // for legacy browsers support (only in prod)
  ...(isProd
    ? [
      'events-helsinki-components',
      'react-helsinki-headless-cms'
    ]
    : []),
];

if (tmModules.length > 0) {
  console.info(
    `Will transpile [${tmModules.join(',')}]`
  );

  const withNextTranspileModules = require('next-transpile-modules')(
    tmModules,
    {
      resolveSymlinks: true,
      debug: false,
    }
  );
  config = withNextTranspileModules(config);
}

// // For all available options, see:
// // https://github.com/getsentry/sentry-webpack-plugin#options.
// const sentryWebpackPluginOptions = {
//   silent: true, // Suppresses all logs
// };

// // Make sure adding Sentry options is the last code to run before exporting, to
// // ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
module.exports = config;

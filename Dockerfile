# =======================================
FROM helsinkitest/node:14-slim as appbase
# =======================================

# Use non-root user
USER appuser

# Yarn
ENV YARN_VERSION 1.22.4
RUN yarn policies set-version $YARN_VERSION

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock /app/
RUN yarn && yarn cache clean --force

# Copy all files
COPY --chown=appuser:appuser . .

# =============================
FROM appbase as development
# =============================

# Use non-root user
USER appuser

# copy all files
COPY --chown=appuser:appuser . .

# Bake package.json start command into the image
CMD ["yarn", "dev"]

# ===================================
FROM appbase as staticbuilder
# ===================================

ARG NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_EVENTS_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT
ARG NEXT_PUBLIC_APP_ORIGIN
ARG NEXT_PUBLIC_MATOMO_URL_BASE
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ARG NEXT_PUBLIC_MATOMO_SRC_URL
ARG NEXT_PUBLIC_MATOMO_TRACKER_URL
ARG NEXT_PUBLIC_MATOMO_ENABLED
ARG NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS

ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_DEBUG

# Use non-root user
USER appuser

# copy all files
COPY --chown=appuser:appuser . .

# Build application
RUN yarn build

# Clean all depencies...
RUN rm -rf node_modules
RUN yarn cache clean

# ... and install only production dependencies
RUN yarn install --production

# ==========================================
FROM helsinkitest/node:14-slim AS production
# ==========================================

ENV PATH $PATH:/app/node_modules/.bin

# Use non-root user
USER appuser

# Copy build, production dependencies, next configs and public files
COPY --from=staticbuilder --chown=appuser:appuser /app/.next /app/.next
COPY --from=staticbuilder --chown=appuser:appuser /app/node_modules /app/node_modules
COPY --from=staticbuilder --chown=appuser:appuser /app/next.config.js /app/next.config.js
COPY --from=staticbuilder --chown=appuser:appuser /app/public /app/public

# i18n configuration
COPY --from=staticbuilder --chown=appuser:appuser /app/i18nRoutes.config.js /app/i18nRoutes.config.js
COPY --from=staticbuilder --chown=appuser:appuser /app/next-i18next.config.js /app/next-i18next.config.js

# Sentry configuration
# COPY --from=staticbuilder --chown=appuser:appuser /app/sentry.client.config.js /app/sentry.client.config.js
# COPY --from=staticbuilder --chown=appuser:appuser /app/sentry.server.config.js /app/sentry.server.config.js

# Expose port
EXPOSE 80

# Start ssr server
CMD ["next", "start"]
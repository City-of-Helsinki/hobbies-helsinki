#Hobbies-helsinki
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Developing locally

Run the development server:

```
yarn dev
# or
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up Husky pre-commit hooks:

1. Run `yarn install` and `yarn prepare` on project root
2. Try `git commit -m foo`. It does not commit anything for real but pre-commit hook should be triggered.

## Available scripts

###`yarn dev`

Runs the application in development mode.
Open [http://localhost:3000](http://localhost:3000) to view in the browser.

The page will reload if you make changes.

###`yarn build`

Builds the production application in the `.next` folder.
Production build can be run locally with `yarn start`.

###`yarn test`
Launches the test runner in the interactive watch mode.

## Headless CMS React Component (HCRC) -library implementation

Hobbies uses a lot of the components from the HCRC-lib. For example the article and event carousels are rendered with the HCRC-lib components.

### Apollo Link (Middleware)

> Apollo Link is designed from day one to be easy to use middleware on your requests. Middlewares are used to inspect and modify every request made over the link, for example, adding authentication tokens to every query. In order to add middleware, you simply create a new link and join it with the HttpLink. - https://www.apollographql.com/docs/react/v2/networking/network-layer/#middleware

There are 2 Apollo-clients in implemented: an Apollo-client for _`Headless CMS` to fetch articles and dynamic pages_ from the CMS and an Apollo-client for _`LinkedEvents` to fetch events_ from the Event-proxy. They both contains URL-fields that are targeted to an external source. Since the content is wanted to be rendered inside the Hobbies app, the URLs needs to be transformed so that they are pointing to an internal path. An Apollo Link is a create place to do the transformation, when the URL context is known. Therefore, the URL should include a hint of the context, e.g a context path like `/articles*` or `/pages*` or a domain e.g `linkedvents.hel.fi`.

The transformation table is in the `AppConfig.ts`:

```typescript
class AppConfig {
  // ...
  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT,
      'NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT'
    );
  }
  static get cmsArticlesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH ?? '/articles';
  }
  static get cmsPagesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH ?? '/pages';
  }
  static get URLRewriteMapping() {
    return {
      [AppConfig.linkedEventsEventEndpoint]: ROUTES.COURSES.replace(
        '/[eventId]',
        ''
      ),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsArticlesContextPath}`]:
        ROUTES.ARTICLES.replace('/[...slug]', ''),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsPagesContextPath}`]:
        '/',
    };
  }
  // ...
}
```

## Contact

City of Helsinki Slack channel #hobbieshelsinki

## Learn more

You can learn more in the [NextJs documentation](https://nextjs.org/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

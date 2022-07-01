import useConfig from "./useConfig";

export default function useEventsApolloClientFromConfig() {
  const { apolloClient } = useConfig();

  if (!apolloClient) {
    throw Error(
      // eslint-disable-next-line max-len
      "When using components that needs an apolloClient, you must include a compatible apolloClient in the apolloClient field of the config object you provide with ConfigProvider"
    );
  }

  return apolloClient;
}

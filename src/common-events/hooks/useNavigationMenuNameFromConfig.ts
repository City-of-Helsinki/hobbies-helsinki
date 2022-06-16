import useConfig from "./useConfig";

export default function useNavigationMenuNameFromConfig() {
  const { navigationMenuName } = useConfig();

  if (!navigationMenuName) {
    throw Error(
      // eslint-disable-next-line max-len
      "When using components that needs a navigationMenuName, you must set the navigation menu name from Headless CMS in the navigationMenuName field of the config object you provide with ConfigProvider"
    );
  }

  return navigationMenuName;
}

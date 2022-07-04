import useConfig from './useConfig';
import useLocale from './useLocale';

export default function useNavigationMenuNameFromConfig() {
  const { getNavigationMenuName } = useConfig();
  const locale = useLocale();
  if (!getNavigationMenuName) {
    throw Error(
      // eslint-disable-next-line max-len
      'When using components that needs a navigationMenuName, you must set the navigation menu name from Headless CMS in the navigationMenuName field of the config object you provide with ConfigProvider'
    );
  }

  return getNavigationMenuName(locale);
}

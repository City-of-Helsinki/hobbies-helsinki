import { Navigation as RHHCApolloNavigation } from "react-helsinki-headless-cms/apollo";

import useLocale from "../../hooks/useLocale";
import useNavigationMenuNameFromConfig from "../../hooks/useNavigationMenuNameFromConfig";
import useRouterFromConfig from "../../hooks/useRouterFromConfig";

export default function Navigation() {
  const router = useRouterFromConfig();
  const navigationMenuName = useNavigationMenuNameFromConfig();
  const locale = useLocale();
  const currentPage = router.pathname;
  return (
    <RHHCApolloNavigation
      menuName={navigationMenuName ?? ""}
      onTitleClick={() => {
        router.push("/", locale);
      }}
      getIsItemActive={({ path }) => path === currentPage}
      getPathnameForLanguage={() => currentPage}
    />
  );
}

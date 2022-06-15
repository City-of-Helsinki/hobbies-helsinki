import { Navigation as RHHCApolloNavigation } from "react-helsinki-headless-cms/apollo";

import useLocale from "../../hooks/useLocale";
import { DEFAULT_HEADER_MENU_NAME } from "../../../constants";
import useRouter from "../../../domain/i18n/router/useRouter";

export default function Navigation() {
  const router = useRouter();
  const locale = useLocale();
  const currentPage = router.pathname;
  return (
    <RHHCApolloNavigation
      menuName={DEFAULT_HEADER_MENU_NAME}
      onTitleClick={() => {
        router.push("/", locale);
      }}
      getIsItemActive={({ path }) => path === currentPage}
      getPathnameForLanguage={() => currentPage}
    />
  );
}

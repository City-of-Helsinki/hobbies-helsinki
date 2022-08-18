import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_HEADER_MENU_NAME } from '../../../constants';
import { Language } from '../../../types';
import {
  getI18nPath,
  getLocalizedCmsItemUrl,
} from '../../../utils/routerUtils';
import useLocale from '../../hooks/useLocale';
import useRouterFromConfig from '../../hooks/useRouterFromConfig';

export default function Navigation() {
  const router = useRouterFromConfig();
  const locale = useLocale();
  const navigationMenuName = DEFAULT_HEADER_MENU_NAME[locale];
  const currentPage = router.pathname;
  return (
    <RHHCApolloNavigation
      menuName={navigationMenuName ?? ''}
      onTitleClick={() => {
        router.push('/');
      }}
      getIsItemActive={({ path }) => path === getI18nPath(currentPage, locale)}
      getPathnameForLanguage={({ slug }) => {
        return getLocalizedCmsItemUrl(
          currentPage,
          router.query,
          slug as Language
        );
      }}
    />
  );
}

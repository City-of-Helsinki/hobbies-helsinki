import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_HEADER_MENU_NAME } from '../../../constants';
import { Language } from '../../../types';
import useLocale from '../../hooks/useLocale';
import useRouter from '../../i18n/router/useRouter';
import { getI18nPath, getLocalizedCmsItemUrl } from '../../i18n/router/utils';

export default function Navigation() {
  const router = useRouter();
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
          slug as Language,
          router.defaultLocale
        );
      }}
    />
  );
}

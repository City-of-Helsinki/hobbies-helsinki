import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';

import { DEFAULT_HEADER_MENU_NAME } from '../../../constants';
import useRouter from '../../../hooks/useRouter';
import { Language } from '../../../types';
import {
  getI18nPath,
  getLocalizedCmsItemUrl,
} from '../../../utils/routerUtils';
import useLocale from '../../hooks/useLocale';

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

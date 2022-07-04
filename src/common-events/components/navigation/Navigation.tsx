import { Navigation as RHHCApolloNavigation } from 'react-helsinki-headless-cms/apollo';

import { Language } from '../../../types';
import useLocale from '../../hooks/useLocale';
import useNavigationMenuNameFromConfig from '../../hooks/useNavigationMenuNameFromConfig';
import useRouter from '../../i18n/router/useRouter';
import { getI18nPath } from '../../i18n/router/utils';

export default function Navigation() {
  const router = useRouter();
  const navigationMenuName = useNavigationMenuNameFromConfig();
  const locale = useLocale();
  const currentPage = router.pathname;
  return (
    <RHHCApolloNavigation
      menuName={navigationMenuName ?? ''}
      onTitleClick={() => {
        router.push('/', locale);
      }}
      getIsItemActive={({ path }) => path === getI18nPath(currentPage, locale)}
      getPathnameForLanguage={({ slug }) =>
        `/${slug}${getI18nPath(currentPage, slug as Language)}`
      }
    />
  );
}

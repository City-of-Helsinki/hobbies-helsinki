import { useMenuQuery } from 'react-helsinki-headless-cms/apollo';
import { Footer, Link } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { Language } from 'events-helsinki-components';
import { useLocale } from 'events-helsinki-components';
import { resetFocusId } from 'events-helsinki-components';

import { getI18nPath } from '../../utils/routerUtils';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';
import { DEFAULT_FOOTER_MENU_NAME, ROUTES } from '../../constants';

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation('footer');
  const { t: tCommon } = useTranslation('common');
  const locale = useLocale();

  const { data } = useMenuQuery({
    variables: {
      id: DEFAULT_FOOTER_MENU_NAME[locale],
    },
  });

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  return (
    <Footer title={tCommon('appName')} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t('searchHobbies')}
          href={getI18nPath(ROUTES.SEARCH, locale)}
        />
      </Footer.Navigation>
      <FooterCategories />
      <Footer.Utilities
        backToTopLabel={t('backToTop')}
        onBackToTopClick={handleBackToTop}
      ></Footer.Utilities>
      <Footer.Base
        copyrightHolder={t('copyright')}
        copyrightText={t('allRightsReserved')}
      >
        {data?.menu?.menuItems?.nodes?.map((navigationItem) => (
          <Footer.Item
            className={styles.footerLink}
            key={navigationItem?.id}
            as={Link}
            href={navigationItem?.path || ''}
            label={navigationItem?.label}
          />
        ))}
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;

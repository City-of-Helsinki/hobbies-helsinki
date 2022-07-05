import { Footer, Link } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

import { resetFocusId } from '../../common-events/components/resetFocus/ResetFocus';
import useLocale from '../../common-events/hooks/useLocale';
import { getI18nPath } from '../../common-events/i18n/router/utils';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation('footer');
  const { t: tCommon } = useTranslation('common');
  const locale = useLocale();
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
          href={getI18nPath('/search', locale)}
        />
      </Footer.Navigation>
      <FooterCategories />
      <Footer.Utilities
        backToTopLabel={t('backToTop')}
        onBackToTopClick={handleBackToTop}
      >
        <Footer.Item
          as={'a'}
          href={t('linkFeedbackUrl')}
          label={t('linkFeedback')}
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder={t('copyright')}
        copyrightText={t('allRightsReserved')}
      >
        <Footer.Item as={Link} href={'/about'} label={t('linkAbout')} />
        <Footer.Item
          as={Link}
          href={'/accessibility'}
          label={t('linkAccessibility')}
        />
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;

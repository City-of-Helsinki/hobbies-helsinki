import classNames from 'classnames';
import { Footer, Link } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';

import { resetFocusId } from '../../common-events/components/resetFocus/ResetFocus';
import { ROUTES } from '../../constants';
import useLocale from '../../hooks/useLocale';
import { getI18nPath } from '../../utils/routerUtils';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';

type Props = {
  noMargin?: boolean;
};

const FooterSection: FunctionComponent<Props> = ({ noMargin }) => {
  const { t } = useTranslation('footer');
  const { t: tCommon } = useTranslation('common');
  const locale = useLocale();
  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  return (
    <Footer
      title={tCommon('appName')}
      className={classNames(styles.footer, noMargin ? styles.noMargin : '')}
    >
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

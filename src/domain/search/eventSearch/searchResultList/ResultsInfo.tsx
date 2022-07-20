import { Button, IconSearch } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Language } from '../../../../types';
import styles from './resultsInfo.module.scss';
import { ROUTES } from '../../../../constants';
import useRouter from '../../../../hooks/useRouter';
import useLocale from '../../../../hooks/useLocale';
import { getI18nPath } from '../../../../utils/routerUtils';

const ResultsInfoContainer: React.FC<{
  resultsCount: number;
}> = ({ resultsCount }) => {
  const { t } = useTranslation('search');
  const router = useRouter();
  const locale = useLocale();
  const isFinnish = locale === 'fi';

  const goToFinnishSearch = () => {
    router.push(getI18nPath(ROUTES.SEARCH, 'fi' as Language));
  };

  const ActionButtons = () => (
    <>
      {!isFinnish && (
        <Button variant="success" onClick={goToFinnishSearch}>
          {t('searchNotification.buttons.labelSearchInFinnish')}
        </Button>
      )}
    </>
  );

  if (resultsCount === 0) {
    return (
      <ResultsInfo
        bigText={t(`searchNotification.noResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  if (resultsCount < 5) {
    return (
      <ResultsInfo
        bigText={t(`searchNotification.fewResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  return null;
};

const ResultsInfo: React.FC<{
  smallText?: string;
  bigText: string;
  actionsSection?: JSX.Element;
}> = ({ bigText, smallText, actionsSection }) => {
  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden />
      </div>
      <div className={styles.bigText}>{bigText}</div>
      {smallText && <div className={styles.smallText}>{smallText}</div>}
      {actionsSection && <div className={styles.actions}>{actionsSection}</div>}
    </div>
  );
};

export default ResultsInfoContainer;

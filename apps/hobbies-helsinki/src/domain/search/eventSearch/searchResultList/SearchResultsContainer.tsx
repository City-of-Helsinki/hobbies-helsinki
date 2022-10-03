import { useTranslation } from 'next-i18next';
import React from 'react';
import { ContentContainer } from 'react-helsinki-headless-cms';
import { PageSection } from 'react-helsinki-headless-cms';

import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
}) => {
  const { t } = useTranslation('search');

  return (
    <PageSection className={styles.searchResultListContainer}>
      <ContentContainer>
        <h2 className={styles.count}>
          {t('textFoundEvents', {
            count: eventsCount,
          })}
        </h2>
        {!!eventsCount && eventList}
        {!loading && <ResultsInfoContainer resultsCount={eventsCount} />}
      </ContentContainer>
    </PageSection>
  );
};

export default SearchResultsContainer;

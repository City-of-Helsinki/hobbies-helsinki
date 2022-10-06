import React from 'react';
import { TagComponent as Tag } from 'react-helsinki-headless-cms';

import styles from './articleDetails.module.scss';

export type ArticleDetailsProps = {
  keywords?: string[];
};
const ArticleDetails: React.FC<ArticleDetailsProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  const [first, second, ...restKeywords] = keywords;

  return (
    <div className={styles.tags}>
      {first && (
        <Tag variant="card" key={first}>
          {first}
        </Tag>
      )}
      {second && (
        <Tag variant="card" key={second}>
          {second}
        </Tag>
      )}
      {!!restKeywords.length && (
        <Tag variant="card">{`+${restKeywords.length}`}</Tag>
      )}
    </div>
  );
};

export default ArticleDetails;

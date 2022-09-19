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

  return (
    <div className={styles.tags}>
      {keywords.map((keyword) => (
        <Tag variant="card" key={keyword}>
          {keyword}
        </Tag>
      ))}
    </div>
  );
};

export default ArticleDetails;

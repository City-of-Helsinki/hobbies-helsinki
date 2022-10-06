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
      {[first, second]
        .filter((t) => t)
        .map((tag) => (
          <Tag variant="card" key={tag}>
            {tag}
          </Tag>
        ))}
      {!!restKeywords.length && (
        <Tag variant="card">{`+${restKeywords.length}`}</Tag>
      )}
    </div>
  );
};

export default ArticleDetails;

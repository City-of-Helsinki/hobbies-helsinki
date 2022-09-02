import React from 'react';
import { TagComponent as Tag } from 'react-helsinki-headless-cms';

export type ArticleDetailsProps = {
  keywords?: string[];
};
const ArticleDetails: React.FC<ArticleDetailsProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <div>
      {keywords.map((keyword) => (
        <Tag variant="card" key={keyword}>
          {keyword}
        </Tag>
      ))}
    </div>
  );
};

export default ArticleDetails;

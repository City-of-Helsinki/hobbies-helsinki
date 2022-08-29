import React from 'react';
import { TagComponent as Tag } from 'react-helsinki-headless-cms';

interface Props {
  keywords?: string[];
}
const ArticleDetails: React.FC<Props> = ({ keywords }) => {
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

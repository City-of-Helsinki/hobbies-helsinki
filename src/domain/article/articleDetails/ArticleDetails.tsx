import React from 'react';
import { Tag } from 'react-helsinki-headless-cms';

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
        <Tag key={keyword}>{keyword}</Tag>
      ))}
    </div>
  );
};

export default ArticleDetails;

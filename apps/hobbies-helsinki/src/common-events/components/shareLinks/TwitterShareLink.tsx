import { useTranslation } from 'next-i18next';
import React from 'react';
import { ShareLinkBase, ShareLinkProps } from 'events-helsinki-components';

import TwitterIcon from '../../../assets/icons/svg/twitter.svg';


const twitterShareUrl = 'https://twitter.com/share';

const TwitterShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation();
  const queryParameters = { url: sharedLink };
  const linkLabel = t('common:shareLink.shareOnTwitter');

  return (
    <ShareLinkBase
      url={twitterShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<TwitterIcon />}
    />
  );
};

export default TwitterShareLink;

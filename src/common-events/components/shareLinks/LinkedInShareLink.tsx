import { useTranslation } from "next-i18next";
import React from "react";

import LinkedInIcon from "../../../assets/icons/svg/linkedin.svg";
import ShareLinkBase from "./ShareLinkBase";
import { ShareLinkProps } from "./types";

const linkedInShareUrl = "https://linkedin.com/shareArticle";

const LinkedInShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation();
  const queryParameters = { url: sharedLink };
  const linkLabel = t("commons.shareLink.shareOnLinkedIn");

  return (
    <ShareLinkBase
      url={linkedInShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      // icon={<LinkedInIcon />}
      icon={<></>}
    />
  );
};

export default LinkedInShareLink;

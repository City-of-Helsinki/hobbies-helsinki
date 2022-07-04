import React from 'react';
import { Link, LinkProps } from 'react-helsinki-headless-cms';

import { Config } from './configContext';

const defaultConfig: Config = {
  t: (translationKey) => translationKey,
  components: {
    A: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a {...props} />
    ),
    Link: (props: LinkProps) => <Link {...props} />,
  },
};

export default defaultConfig;

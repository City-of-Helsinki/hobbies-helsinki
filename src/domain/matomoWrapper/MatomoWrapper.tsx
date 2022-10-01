import { useMatomo } from '@jonkoops/matomo-tracker-react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode | undefined;
}

const MatomoWrapper: React.FC<Props> = ({ children }) => {
  const { trackPageView } = useMatomo();
  const { asPath: pathname } = useRouter();

  // Track page changes when pathnname changes
  useEffect(() => {
    trackPageView({
      href: window.location.href,
    });
  }, [pathname, trackPageView]);

  return <>{children}</>;
};

export default MatomoWrapper;

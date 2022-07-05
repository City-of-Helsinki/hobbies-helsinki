import isClient from '../../common/utils/isClient';

const ScrollToTop = (): void => {
  if (isClient) {
    window.scrollTo(0, 0);
  }
};

export default ScrollToTop;

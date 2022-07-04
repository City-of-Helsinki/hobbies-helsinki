import { useContext } from 'react';

import configContext from '../configProvider/configContext';

export default function useConfig() {
  return useContext(configContext);
}

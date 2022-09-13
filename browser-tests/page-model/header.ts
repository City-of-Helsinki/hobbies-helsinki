import { t, Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';
//import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';

import { translations } from '../../src/tests/initI18n';

class HeaderUtil {
//  currentLang = DEFAULT_LANGUAGE
  header = screen.getByRole('header');
  title = screen.getByText(translations.common.appName)

  async verifyHeader( ) {
    await t.expect(this.header.exists).ok();
    await t.expect(this.title.exists).ok();
  }
}

export default HeaderUtil;

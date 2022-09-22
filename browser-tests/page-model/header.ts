import { Selector, t } from 'testcafe';
import { screen } from '@testing-library/testcafe';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from 'events-helsinki-core';

import i18n from '../../src/tests/initI18n';

class Header {
  currentLang = DEFAULT_LANGUAGE;

  banner = screen.getByRole('banner');
  languageSelectorButton = Selector('#languageSelector-button');
  languageSelectorItem = Selector('a').withAttribute('lang', this.currentLang);

  private setLanguage(lang: SUPPORT_LANGUAGES) {
    this.currentLang = lang;
    this.languageSelectorItem = Selector('a').withAttribute('lang', this.currentLang);
  }

  public async changeLanguage(lang: SUPPORT_LANGUAGES) {
    console.log("changeLanguage to " + lang);

    this.setLanguage(lang);

    const languageSelectorButton_screen = screen.getByRole('button', { name: await this.languageSelectorButton.innerText });
    const languageSelectorItem_screen = screen.getByRole('link', { name: await this.languageSelectorItem.innerText });

    await t
      .click(languageSelectorButton_screen)
      .click(languageSelectorItem_screen);

    await i18n.changeLanguage(lang);
  }

  public async verify() {
    console.log("Header: verify");
    await t.expect(this.banner.exists).ok();
  }
}

export default Header;

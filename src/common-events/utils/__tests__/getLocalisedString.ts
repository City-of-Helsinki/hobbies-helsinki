import getLocalisedString from '../getLocalisedString';

const dummyLocalisedObj = {
  en: 'text en',
  fi: 'text fi',
  sv: 'text sv',
};

describe('getLocalisedString function', () => {
  it('should return localised string', () => {
    expect(getLocalisedString(dummyLocalisedObj, 'en')).toBe('text en');
    expect(getLocalisedString(dummyLocalisedObj, 'fi')).toBe('text fi');
    expect(getLocalisedString(dummyLocalisedObj, 'sv')).toBe('text sv');
  });
  /**
   * If logic for selecting the fallback language priority is needed,
   * then prioritize order is English, Finnish, Swedish.
   * Ref: https://helsinkisolutionoffice.atlassian.net/browse/HH-110
   */
  it('should return string in first prioritized language when localised string is not found', () => {
    expect(
      getLocalisedString({ ...dummyLocalisedObj, sv: undefined }, 'sv')
    ).toBe('text en');
    expect(
      getLocalisedString(
        { ...dummyLocalisedObj, en: undefined, sv: undefined },
        'sv'
      )
    ).toBe('text fi');
  });
});

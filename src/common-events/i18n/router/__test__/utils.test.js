import { getLocalizedCmsItemUrl, stringifyUrlObject } from '../utils';

describe('i18n router utils', () => {
  describe('stringifyUrlObject', () => {
    it('should correctly stringify url object with search', () => {
      expect(
        stringifyUrlObject({
          pathname: '/venue/[id]/map',
          search: '?isOpenNow=true&q=Swimming%20Pool',
          query: {
            id: 'tprek:123',
          },
        })
      ).toMatchInlineSnapshot(
        `"/venue/tprek:123/map?isOpenNow=true&q=Swimming%20Pool"`
      );
    });

    it('should correctly stringify url object with query', () => {
      expect(
        stringifyUrlObject({
          pathname: '/venue/[id]/map',
          query: {
            id: 'tprek:123',
            isOpenNow: true,
            q: 'Swimming Pool',
          },
        })
      ).toMatchInlineSnapshot(
        `"/venue/tprek:123/map?isOpenNow=true&q=Swimming%20Pool"`
      );
    });
  });

  describe('getLocalizedCmsItemUrl', () => {
    it('should correctly return the localized path for the default locale', () => {
      expect(
        getLocalizedCmsItemUrl(
          '/courses/[eventId]',
          {
            eventId: 'hki:123',
          },
          'fi',
          'fi'
        )
      ).toMatchInlineSnapshot(`"/kurssit/hki:123"`);
    });

    it('should correctly return the localized path for the secondary locale', () => {
      expect(
        getLocalizedCmsItemUrl(
          '/courses/[eventId]',
          {
            eventId: 'hki:123',
          },
          'en',
          'fi'
        )
      ).toMatchInlineSnapshot(`"/en/courses/hki:123"`);
    });

    it('should correctly return the localized path for the wildcard slug', () => {
      expect(
        getLocalizedCmsItemUrl(
          '/articles/[...slug]',
          {
            slug: 'some/url',
          },
          'fi',
          'fi'
        )
      ).toMatchInlineSnapshot(`"/artikkelit/some/url"`);
    });
  });
});

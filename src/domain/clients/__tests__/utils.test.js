import {
  initializeApolloClient,
  MutableReference,
} from 'events-helsinki-core';

describe('client utils', () => {
  describe('initializeApolloClient', () => {
    it('should mutate references used for caching the client', () => {
      let mutableCache = new MutableReference();

      initializeApolloClient({
        initialState: null,
        mutableCachedClient: mutableCache,
        createClient: () => 1,
      });

      expect(mutableCache.reference).toEqual(1);
    });
  });
});

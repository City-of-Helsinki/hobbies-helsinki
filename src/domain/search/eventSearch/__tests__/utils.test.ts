import { advanceTo, clear } from 'jest-date-mock';

import { DATE_TYPES } from '../../../../constants';
import { Language } from '../../../../types';
import { EVENT_DEFAULT_SEARCH_FILTERS, EVENT_SORT_OPTIONS } from '../constants';
import { getEventSearchVariables, getNextPage, getSearchQuery } from '../utils';

afterAll(() => {
  clear();
});

describe('getSearchQuery function', () => {
  it('get search query', () => {
    expect(getSearchQuery(EVENT_DEFAULT_SEARCH_FILTERS)).toBe('');

    expect(
      getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        categories: ['category1', 'category2'],
        dateTypes: ['type1', 'type2'],
        text: ['test'],
      })
    ).toBe('?categories=category1,category2&dateTypes=type1,type2&text=test');

    expect(
      getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        dateTypes: ['type1', 'type2'],
        end: new Date('2019-12-20'),
        start: new Date('2019-11-20'),
        text: ['test'],
      })
    ).toBe('?end=2019-12-20&start=2019-11-20&text=test');
  });
});

describe('getEventSearchVariables function', () => {
  const defaultParams = {
    include: [],
    language: 'fi' as Language,
    pageSize: 10,
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: [],
  };

  it('should return start=now if start time is in past/today', () => {
    advanceTo('2020-10-06');
    const { start: start1 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams('?start=2020-10-06'),
    });
    expect(start1).toBe('now');

    const { start: start2 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams('?start=2020-10-01'),
    });
    expect(start2).toBe('now');
  });

  it('should return correct start and end time', () => {
    advanceTo('2020-10-06');
    const { end: end1, start: start1 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(`?dateTypes=${DATE_TYPES.THIS_WEEK}`),
    });
    expect(start1).toBe('now');
    expect(end1).toBe('2020-10-11');

    const { end: end2, start: start2 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(`?dateTypes=${DATE_TYPES.TODAY}`),
    });
    expect(start2).toBe('now');
    expect(end2).toBe('today');

    const { end: end3, start: start3 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(`?dateTypes=${DATE_TYPES.TOMORROW}`),
    });
    expect(start3).toBe('2020-10-07');
    expect(end3).toBe('2020-10-07');

    const { end: end4, start: start4 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(`?dateTypes=${DATE_TYPES.WEEKEND}`),
    });
    expect(start4).toBe('2020-10-10');
    expect(end4).toBe('2020-10-11');

    const { end: end5, start: start5 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?dateTypes=${DATE_TYPES.TODAY},${DATE_TYPES.TOMORROW}`
      ),
    });
    expect(start5).toBe('now');
    expect(end5).toBe('2020-10-07');

    const { end: end6, start: start6 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?dateTypes=${DATE_TYPES.TODAY},${DATE_TYPES.WEEKEND}`
      ),
    });
    expect(start6).toBe('now');
    expect(end6).toBe('2020-10-11');

    const { end: end7, start: start7 } = getEventSearchVariables({
      ...defaultParams,
      params: new URLSearchParams(
        `?dateTypes=${DATE_TYPES.THIS_WEEK}&end=2020-10-15`
      ),
    });
    expect(start7).toBe('now');
    expect(end7).toBe('2020-10-15');
  });

  // it("should return divisions", () => {
  //   advanceTo("2020-10-06");
  //   const { division } = getEventSearchVariables({
  //     ...defaultParams,
  //     params: new URLSearchParams(`?divisions=kunta:espoo`),
  //   });
  //   expect(division).toContain("kunta:espoo");
  // });

  it('should not use *Ongoing params when no text present', () => {
    const { allOngoingAnd, localOngoingAnd, division } =
      getEventSearchVariables({
        ...defaultParams,
        params: new URLSearchParams(),
      });
    expect(division).toBeUndefined();
    expect(allOngoingAnd).toBeUndefined();
    expect(localOngoingAnd).toBeUndefined();
  });

  // it("should use allOngoing without division when only text present", () => {
  //   const { allOngoingAnd, localOngoingAnd, division } =
  //     getEventSearchVariables({
  //       ...defaultParams,
  //       params: new URLSearchParams(`?text=Rock`),
  //     });
  //   expect(division).toBeUndefined();
  //   expect(allOngoingAnd).toEqual(["Rock"]);
  //   expect(localOngoingAnd).toBeUndefined();
  // });

  // it('should search localOngoing when division given', () => {
  //   const { allOngoingAnd, localOngoingAnd, division } =
  //     getEventSearchVariables({
  //       ...defaultParams,
  //       params: new URLSearchParams(
  //         `?text=Rock&divisions=kaupunginosa:alppiharju`
  //       ),
  //     });
  //   expect(division).toContain('kaupunginosa:alppiharju');
  //   expect(allOngoingAnd).toBeUndefined();
  //   expect(localOngoingAnd).toEqual(['Rock']);
  // });

  it('should search localOngoing when a place given', () => {
    const place = 'tprek:7254'; // MAPPED_PLACES["annantalo"];
    const { allOngoingAnd, localOngoingAnd, location } =
      getEventSearchVariables({
        ...defaultParams,
        params: new URLSearchParams(`?text=Rock&places=${place}`),
      });
    expect(location).toContain(place);
    expect(allOngoingAnd).toBeUndefined();
    expect(localOngoingAnd).toEqual(['Rock']);
  });
});

describe('getNextPage function', () => {
  it('should return next page', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?page=2',
        previous: null,
      })
    ).toBe(2);
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value&page=2',
        previous: null,
      })
    ).toBe(2);
  });

  it('should return null', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value',
        previous: null,
      })
    ).toBeNull();
  });
});

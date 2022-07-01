import FileSaver from "file-saver";
import React from "react";
import mockRouter from "next-router-mock";

import { EventDetails } from '../../../../domain/nextApi/graphql/generated/graphql';
import { translations } from '../../../../tests/initI18n';
import { fakeEvent } from '../../../../tests/mockDataUtils';
import {
  act,
  actWait,
  configure,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../../tests/testUtils';
import getDateRangeStr from '../../../../common-events/utils/getDateRangeStr';
import { EventFields, SuperEventResponse } from '../../types';
import EventInfo from '../EventInfo';
import { subEventsListTestId, superEventTestId } from '../EventsHierarchy';
import {
  addressLocality,
  email,
  event,
  getSubEventsMocks,
  locationName,
  mocks,
  mocksWithSubEvents,
  organizationName,
  organizerName,
  price,
  streetAddress,
  subEventsLoadMoreResponse,
  subEventsResponse,
  superEventInternalId,
  telephone,
} from "../utils/EventInfo.mocks";

beforeEach(() => {
  mockRouter.setCurrentUrl("/");
});
configure({ defaultHidden: true });

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime!,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.common.timeAbbreviation,
});

it('should render event info fields', async () => {
  render(<EventInfo event={event} />, { mocks });
  await actWait();

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelAudience },
    { role: 'heading', name: translations.event.info.labelPublisher },
    { role: 'heading', name: translations.event.info.labelOrganizer },
    {
      role: 'link',
      name: `${translations.event.info.extlinkFacebook} ${translations.common.srOnly.opensInANewTab}`,
    },
    { role: 'heading', name: translations.event.info.labelDirections },
    {
      role: 'link',
      name: `${translations.event.location.directionsGoogle} ${translations.common.srOnly.opensInANewTab}`,
    },
    {
      role: 'link',
      name: `${translations.event.location.directionsHSL} ${translations.common.srOnly.opensInANewTab}`,
    },
    { role: 'heading', name: translations.event.info.labelPrice },
  ];

  itemsByRole.forEach(({ role, name }) => {
    expect(screen.queryByRole(role, { name })).toBeInTheDocument();
  });

  const itemsByText = [
    'Ma 22.6.2020, klo 10.00 – 13.00',
    addressLocality,
    locationName,
    streetAddress,
    email,
    telephone,
    organizationName,
    organizerName,
    price,
  ];

  itemsByText.forEach((item) => {
    expect(screen.queryByText(item)).toBeInTheDocument();
  });
});

it('should hide the organizer section when the organizer name is not given', async () => {
  const mockEvent = {
    ...event,
    provider: null,
  };
  render(<EventInfo event={mockEvent} />, { mocks });
  await actWait();
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelPublisher,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOrganizer,
    })
  ).not.toBeInTheDocument();
});

it('should hide other info section', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  // Event info fields
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(email)).not.toBeInTheDocument();
  expect(screen.queryByText(telephone)).not.toBeInTheDocument();
});

it('should hide other info section registration url from external links', () => {
  const mockEvent = {
    ...event,
    externalLinks: [
      {
        name: 'registration',
        link: 'https://harrastushaku.fi/register/14302',
      },
    ],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.registration,
    })
  ).not.toBeInTheDocument();
});

it('should hide the map link from location info if location is internet', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      id: 'helsinki:internet',
      email: null,
      externalLinks: [],
      telephone: null,
    },
  } as EventFields;
  render(<EventInfo event={mockEvent} />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.openMap,
    })
  ).not.toBeInTheDocument();
});

it('should open ticket buy page', async () => {
  global.open = jest.fn();
  render(<EventInfo event={event} />, { mocks });

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.ariaLabelBuyTickets,
    })!
  );

  await waitFor(() => {
    expect(global.open).toBeCalled();
  });
});

it.skip("should create ics file succesfully", async () => {
  const saveAsSpy = jest.spyOn(FileSaver, "saveAs");
  render(<EventInfo event={event} />, { mocks });

  // Event info fields
  await act(() =>
    userEvent.click(
      screen.queryByRole("button", {
        name: translations.event.info.buttonAddToCalendar,
      })!
    )
  );

  await waitFor(() => {
    expect(saveAsSpy).toBeCalled();
  });
});

it.skip("should create ics file succesfully when end time is not defined", async () => {
  const saveAsSpy = jest.spyOn(FileSaver, "saveAs");
  render(<EventInfo event={{ ...event, endTime: null }} />, {
    mocks,
  });

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })!
  );

  await waitFor(() => {
    expect(saveAsSpy).toBeCalled();
  });
});

it('should hide audience age info on single event page', async () => {
  render(<EventInfo event={event} />, {
    routes: [`/courses`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/5-15 -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should show formatted audience age info on signle event page if max age is not specified', async () => {
  render(<EventInfo event={{ ...event, audienceMaxAge: null }} />, {
    routes: [`/courses`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/5\+ -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should hide audience age info on single event page if min and max ages are not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: null, audienceMaxAge: null }}
    />,
    {
      routes: [`/courses`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/-vuotiaat/i)).not.toBeInTheDocument();
  });
});

describe('OrganizationInfo', () => {
  it('should show event type related providers link text in events info', async () => {
    render(<EventInfo event={event} />, { mocks });
    await waitFor(() => {
      expect(
        screen.getByText("Katso julkaisijan muut harrastukset")
      ).toBeInTheDocument();
    });
  });
});

describe('superEvent', () => {
  it('should render super event title and link when super event is given', async () => {
    const superEvent = fakeEvent({
      superEvent: { internalId: superEventInternalId },
    });
    const superEventResponse = {
      data: superEvent,
      status: 'resolved',
    } as SuperEventResponse;
    const { router } = render(
      <EventInfo event={event} superEvent={superEventResponse} />,
      {
        mocks: mocksWithSubEvents,
      }
    );
    await actWait();
    expect(
      screen.queryByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).toBeInTheDocument();

    await act(() =>
      userEvent.click(
        within(screen.getByTestId(superEventTestId)).getByText(
          superEvent.name.fi!
        )
      )
    );
    expect(router.pathname).toBe(`/courses/${superEvent.id}`);
  });

  it('should should not render super event title when super event is not given', async () => {
    render(<EventInfo event={event} />, {
      mocks,
    });
    await actWait();

    expect(
      screen.queryByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).not.toBeInTheDocument();
  });
});

describe('subEvents', () => {
  it('should render sub events title and content when sub events are given', async () => {
    render(<EventInfo event={event} />, {
      mocks: mocksWithSubEvents,
    });
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: translations.event.subEvents.title,
        })
      ).toBeInTheDocument();
    });
    await testSubEvents();
  });

  it("should navigate to sub events page when it is clicked", async () => {
    const { router } = render(<EventInfo event={event} />, {
      mocks: mocksWithSubEvents,
    });
    const eventsList = await screen.findByTestId(subEventsListTestId);
    const subEvent = subEventsResponse.data[0];
    const dateStr = getDateRangeStr(getDateRangeStrProps(subEvent));

    await act(() =>
      userEvent.click(
        within(eventsList).queryByText(`${subEvent.name.fi} ${dateStr}`)!
      )
    );
    expect(router.pathname).toBe(`/courses/${subEvent.id}`);
  });

  it("should render subEvents with other times title when the event is a middle level event in event hierarchy", async () => {
    const middleAsSuperEventMock = getSubEventsMocks({
      variables: {
        superEvent: event.id,
      },
      response: {
        ...subEventsResponse,
        data: subEventsResponse.data.map((subEvent) => ({
          ...subEvent,
          superEvent: {
            internalId: `https://api.hel.fi/linkedevents/v1/event/${event.id}`,
          },
        })),
      },
    });
    const superEventMock = getSubEventsMocks({
      variables: {
        superEvent: "super:123",
      },
      response: subEventsResponse,
    });
    const superEventResponseMock: SuperEventResponse = {
      data: Object.assign({}, event, {
        subEvents: [
          {
            internalId: `https://api.hel.fi/linkedevents/v1/event/${event.id}`,
          },
        ],
      }),
      status: "resolved",
    };
    render(
      <EventInfo
        event={Object.assign({}, event, {
          superEvent: {
            internalId: "https://api.hel.fi/linkedevents/v1/event/super:123",
          },
          subEvents: [
            { internalId: "https://api.hel.fi/linkedevents/v1/event/sub:123" },
          ],
        })}
        superEvent={superEventResponseMock}
      />,
      {
        mocks: [...mocks, middleAsSuperEventMock, superEventMock],
      }
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: translations.event.otherTimes.title,
          hidden: false,
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('heading', {
        name: translations.event.subEvents.title,
      })
    ).not.toBeInTheDocument();
  });

  async function testSubEvents() {
    await waitFor(() => {
      expect(
        screen.queryByTestId('skeleton-loader-wrapper')
      ).not.toBeInTheDocument();
    });
    subEventsResponse.data.slice(0, 3).forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });
    const fourthevent = subEventsResponse.data[3];
    const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
    expect(
      screen.queryByText(`${event.name.fi} ${fourthDateStr}`)
    ).not.toBeInTheDocument();

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.relatedEvents.buttonShow,
    });

    await act(() => userEvent.click(toggleButton));

    await actWait();

    subEventsResponse.data.forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });

    // FIXME: Test load more sub events

    // console.log(
    //   "subEventsLoadMoreResponse events names",
    //   subEventsLoadMoreResponse.data.map(
    //     (event) =>
    //       `${event.name.fi} ${getDateRangeStr(getDateRangeStrProps(event))}`
    //   )
    // );
    // await waitFor(() => {
    //   expect(
    //     screen.queryByTestId("skeleton-loader-wrapper")
    //   ).not.toBeInTheDocument();
    // });
    // subEventsLoadMoreResponse.data.slice(0, 1).forEach((event) => {
    //   const dateStr = getDateRangeStr(getDateRangeStrProps(event));
    //   expect(
    //     screen.getByText(`${event.name.fi} ${dateStr}`)
    //   ).toBeInTheDocument();
    // });
  }
});

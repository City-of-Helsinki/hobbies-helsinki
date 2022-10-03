import {
  EventFieldsFragment,
  EventTypeId,
} from '../nextApi/graphql/generated/graphql';

export type KeywordOption = {
  id: string;
  name: string;
};

export type EventFields = EventFieldsFragment;

export type SuperEventResponse = {
  data: EventFields | null;
  status: 'pending' | 'resolved';
};

export type EventType = 'event' | 'course';

export const EVENT_TYPE_TO_ID: Record<EventType, EventTypeId> = {
  event: EventTypeId.General,
  course: EventTypeId.Course,
};

declare type EventsStateObject = {
  eventDetails: ?Array<EventDetailsObject>
};

declare type EventDetailsObject = {
  date: string,
  day: string,
  events: EventsObject,
  formatedDate: string
};

declare type EventsObject = {
  end: dateObject,
  start: dateObject,
  event: eventsDataObject
};

declare type dateObject = {
  date: string,
  time: string
};

declare type eventsDataObject = {
  title: string,
  description: string
}

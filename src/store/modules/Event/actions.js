// @flow
import * as types from './mutation-types';

const actions = {
  eventCalendar: ({commit}: {commit: Function}, data: Object) => {
    commit(types.SET_EVENTS, data);
  },
  viewEvent: ({commit}: {commit: Function}, data: Object) => {
    commit(types.SET_VIEW_EVENTS, data);
  },
  setEventStore: ({commit}: {commit: Function}, data: Object) => {
    commit(types.SET_EVENTS_STORE, data);
  },
  saveEvent: ({commit}: {commit: Function}, data: Object) => {
    console.log(data, 'Call back-end api to save the event');
    return commit(types.SAVE_EVENT, data);
  },
  deleteEvent: ({commit}: {commit: Function}, data: Object) => {
    commit(types.DELETE_EVENTS, data);
  },
  moveEvents: ({commit}: {commit: Function}, data: Object) => {
    commit(types.MOVE_EVENTS, data);
  }
};
export default actions;

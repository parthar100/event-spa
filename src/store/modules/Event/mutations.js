'use strict';
/* @flow */
import * as types from './mutation-types';
import {eventDetails} from './skeleton';
import cloneDeep from 'lodash/cloneDeep';

const mutations = {
  [types.SET_EVENTS] (state: EventsStateObject, data: Object) {
    state && (state.eventDetails = data.data);
  },
  [types.SET_VIEW_EVENTS] (state, data: Object) {
    if (state &&
    state.eventDetails &&
    state.eventDetails[data.index] &&
    state.eventDetails[data.index].events) {
      state.eventDetails[data.index].events = data.data.events;
    } else {
      state &&
      state.eventDetails &&
      state.eventDetails[data.index] &&
      (state.eventDetails[data.index].events = {...cloneDeep(eventDetails)});
      state.eventDetails[data.index].events.start && (state.eventDetails[data.index].events.start.date = state.eventDetails[data.index].date);
      state.eventDetails[data.index].events.end && (state.eventDetails[data.index].events.end.date = state.eventDetails[data.index].date);
    }
  },
  [types.SET_EVENTS_STORE] (state, data: Object) {
    state &&
    state.eventDetails &&
    state.eventDetails[data.index] &&
    state.eventDetails[data.index].events &&
    state.eventDetails[data.index].events[data.events.parent] &&
    (state.eventDetails[data.index].events[data.events.parent][data.events.child] = data.events.value);
    if (data.events.parent === 'start' && data.events.child === 'date') {
      state.eventDetails[data.index].events.end[data.events.child] = data.events.value;
    }
  },
  [types.DELETE_EVENTS] (state: EventsStateObject, data: Object) {
    state &&
    state.eventDetails &&
    state.eventDetails[data.index] &&
    state.eventDetails[data.index].events &&
    (state.eventDetails[data.index].events = null);
  },
  [types.MOVE_EVENTS] (state, data: Object) {
    state &&
    state.eventDetails &&
    state.eventDetails[data.oldIndex] &&
    state.eventDetails[data.oldIndex].events &&
    (state.eventDetails[data.newIndex].events = state.eventDetails[data.oldIndex].events);
    state.eventDetails[data.newIndex].events.start && (state.eventDetails[data.newIndex].events.start.date = state.eventDetails[data.newIndex].date);
    state.eventDetails[data.newIndex].events.end && (state.eventDetails[data.newIndex].events.end.date = state.eventDetails[data.newIndex].date);
    state.eventDetails[data.oldIndex].events = null;
  },
  [types.SAVE_EVENT] (state, data: Object) {
    data.mode === 'edit' && data.dateChanged && (state.successToSaveEvent = false);
    data.mode === 'edit' && data.dateChanged && state && state.eventDetails.filter((event, index) => {
      if (event.date === data.data.start.date) {
        state.successToSaveEvent = true;
        state.eventDetails[index].events = data.data;
        if (index !== data.index) {
          state.eventDetails[data.index].events = null;
        }
      }
    });
  }
};

export default mutations;

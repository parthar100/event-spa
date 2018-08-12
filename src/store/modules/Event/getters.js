'use strict';

import get from 'lodash/get';

const getters = {
  getEventDetails: (state) => {
    return get(state, 'eventDetails', []);
  },
  getEventSaved: (state) => {
    return get(state, 'successToSaveEvent');
  }
};

export default getters;

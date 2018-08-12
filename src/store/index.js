'use strict';
// @flow
import Vue from 'vue';
import Vuex from 'vuex';
// $FlowFixMe
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const strictState = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { },
  strict: strictState,
  plugins: [
    createLogger()
  ]
});

'use strict';
// @flow

export function addStoreModule (key, data) {
  if (!Object.keys(this.$store._modules.root._children).includes(key)) {
    this.$store.registerModule(key, data);
  }
}

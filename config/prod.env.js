'use strict'
require('dotenv').config();
var _ = require('lodash');

let env = {};

env = _(process.env)
  .pickBy( (value, key) => key.match(/^ET_/))
  .mapKeys((value, key) => key.substring('ET_'.length))
  .mapValues(value => `"${value}"`)
  .value();

const passThrough = ['NODE_ENV']
passThrough.forEach((key) => {
  if (typeof process.env[key] !== 'undefined') {
    env[key] = `"${process.env[key]}"`
  }
})

module.exports = env;

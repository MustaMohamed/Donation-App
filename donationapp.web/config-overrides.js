const rewireLess = require('react-app-rewire-less-modules');
const {
  override,
  addLessLoader,
} = require('customize-cra');
const path = require('path');

module.exports = override(addLessLoader());
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/mobx-form-schema.production.js');
} else {
  module.exports = require('./dist/mobx-form-schema.development.js');
}
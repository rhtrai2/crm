'use strict';

module.exports = function(app) {
  var customers = require('../controllers/customers.server.controller');

  app.route('/api/v1/customers').post(customers.create).get(customers.list);
};

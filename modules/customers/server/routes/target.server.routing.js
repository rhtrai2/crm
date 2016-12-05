'use strict';

module.exports = function(app) {
  var target = require('../controllers/target.server.controller');

  app.route('/api/v1/target').post(target.campaign).get(target.list);
  app.route('/api/v1/run').get(target.run);
};

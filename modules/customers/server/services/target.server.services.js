'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  nodemailer = require('nodemailer'),
  config = require(path.resolve('./config/config')),
  Customers = mongoose.model('Customers'),
  Target = mongoose.model('Target'),
  async = require('async'),
  moment = require('moment');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

module.exports = {

  campaign: function(credentials, callback) {
    var target = new Target(credentials);
    target.save(function (err, target) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, target);
      }
    });
  },
  list: function(credentials, callback) {
    var query = Target.find({ 'name': credentials.name });
    query.exec(callback);
  }
};


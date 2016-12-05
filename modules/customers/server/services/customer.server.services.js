'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Customers = mongoose.model('Customers');

module.exports = {
  create: function(credentials, callback) {
    var customers = new Customers(credentials);
    customers.save(function (err, customers) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, customers);
      }
    });
  },
  list: function(credentials, callback) {

    // console.log(credentials);
    console.log(credentials.id);
    var query = Customers.find({ 'attributes': { $size: 0 } });
    // var query = Customers.find();
    // if (credentials.type === 'leads') {
    if (credentials.initialSource) {
      query.where('initialSource').equals(credentials.initialSource);
    }
    if (credentials.id) {
      query.where('_id').in(credentials.id);
    }
    query.select('email');
    query.exec(function (err, customers) {
      // console.log(err);
      // console.log(customers);
      if (err) {
        return callback(err);
      } else {
        return callback(null, customers);
      }
    });
    // }
    // var queryLeads = Customers.find({ 'attributes': { $size: 0 } }, { '_id': 1 });
    // if (! param) {
    //   queryLeads.exec(function (err, customers) {
    //     if (err) {
    //       return callback(err);
    //     } else {
    //       return callback(null, customers);
    //     }
    //   });
    // } else {
    //   queryLeads.and([{ [s]: param }]).exec(function (err, customers) {
    //     if (err) {
    //       return callback(err);
    //     } else {
    //       return callback(null, customers);
    //     }
    //   });
    // }
  }
};

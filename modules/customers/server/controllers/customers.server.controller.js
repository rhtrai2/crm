'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Customers = mongoose.model('Customers'),
  Target = mongoose.model('Target'),
  async = require('async'),
  moment = require('moment');
var customerService = require('../services/customer.server.services');


module.exports = {
  create: function(req, res) {
    console.log(req);

    customerService.create(req.body, function(err, customers) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).json({
          message: 'Inserted'
        });
      }
    });
  },
  list: function(req, res) {

    customerService.list(req.query, function(err, customers) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).json(customers);
      }
    });
  }
  // campaign: function(req, res) {
  //   var params = req.query;

  //   async.waterfall([
  //     function(callback) {
  //       customerService.list(req.body.from, function(err, customers) {
  //         callback(err, customers);
  //       });
  //     },
  //     function(customers, callback) {
  //       var requestBody = {
  //         name: req.body.name,
  //         userId: customers
  //       };
  //       console.log(requestBody);
  //       customerService.campaign(requestBody, function(err, campaigns) {
  //         callback(err, campaigns);
  //       });
  //     }
  //   ],
  //     function (err, result) {
  //       // result now equals 'done'
  //       if (err) {
  //         return res.status(422).send({
  //           message: errorHandler.getErrorMessage(err)
  //         });
  //       } else {
  //         res.status(200).json(result);
  //       }
  //     });
  // },
  // run: function(req, res) {
  //   customerService.run(req.body, function(err, customers) {
  //     if (err) {
  //       return res.status(422).send({
  //         message: errorHandler.getErrorMessage(err)
  //       });
  //     } else {
  //       res.status(200).json(customers);
  //     }
  //   });
  // }
};

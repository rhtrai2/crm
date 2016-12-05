var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Customers = mongoose.model('Customers'),
  Target = mongoose.model('Target'),
  async = require('async'),
  moment = require('moment');
var targetService = require('../services/target.server.services');
var customerService = require('../services/customer.server.services');


module.exports = {
  campaign: function(req, res) {
    async.waterfall([
      function(callback) {
        customerService.list(req.body, function(err, customers) {
          callback(err, customers);
        });
      },
      function(customers, callback) {
        var requestBody = {
          name: req.body.name,
          userId: customers
        };
        targetService.campaign(requestBody, function(err, campaigns) {
          callback(err, campaigns);
        });
      }
    ],
    function (err, result) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).json(result);
      }
    });
  },
  list: function(req, res) {
    targetService.list(req.query, function(err, customers) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).json(customers);
      }
    });
  },
  run: function(req, res) {
    // targetService.list(req.query, function(err, customers) {
    //   if (err) {
    //     return res.status(422).send({
    //       message: errorHandler.getErrorMessage(err)
    //     });
    //   } else {
    //     res.status(200).json(customers);
    //   }
    // });

    async.waterfall([
      function(callback) {
        targetService.list(req.query, function(err, customers) {

          callback(err, customers);
        });
      },
      function(customers, callback) {
        var arr = customers;
        var itemsArray = arr[0].userId;
        console.log(itemsArray);
        customerService.list(itemsArray, function(err, campaigns) {
          if (err) {
            callback(err);
          } else {
            callback(null, campaigns);
          }
        });
      }
    ],
    function (err, result) {
      console.log(result);
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).json(result);
      }
    });
  }
};

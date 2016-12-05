'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customers Schema
 */
var CustomersSchema = new Schema({
  // Customers model fields
  // ...
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: '',
    required: 'Please fill in an email'
    // validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  contactNumber: {
    type: Number,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: ''
  },
  initialSource: {
    type: String,
    required: 'Please fill in a source',
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  attributes: [{
    firstname: {
      type: String,
      trim: true,
      default: ''
    },
    lastname: {
      type: String,
      trim: true,
      default: ''
    },
    gender: {
      type: String
    },
    customerId: {
      type: Number
    },
    conversionSource: {
      type: String
    },
    conversionProgramme: {
      type: String
    }
  }],
  updated: {
    type: Date
  }
});

mongoose.model('Customers', CustomersSchema);

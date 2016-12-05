'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customers Schema
 */
var TargetSchema = new Schema({
  // Customers model fields
  // ...

  name: {
    type: String,
    required: 'Please fill in a source',
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers'
  }],
  updated: {
    type: Date
  }
});

mongoose.model('Target', TargetSchema);

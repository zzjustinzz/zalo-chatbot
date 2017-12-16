'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * InteractSchema Schema
 */
var InteractSchema = new Schema({
    interact_type: {
        type: String,
        required: false
    },
    customerSay: {
        type: String,
        required: false
    },
    botMsgs: [],
    customerId: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: false
    },
    orderId: {
        type: String,
        required: false
    },
    conversationId: {
        type: String,
        required: false
    }
});

/**
 * Validations
 */
//LayoutSchema.path('name').validate(function (name) {
//    return !!name;
//}, 'Name cannot be blank');

/**
 * Statics
 */
InteractSchema.statics.load = function(id, cb) {
    this.findOne({
            _id: id
        })
        .exec(cb);
};

mongoose.model('Interact', InteractSchema);
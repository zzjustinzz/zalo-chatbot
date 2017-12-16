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
    customerSay: {
        type: String,
        required: false
    },
    botMsgs: {
        type: String,
        required: false
    },
    oaid: {
        type: String,
        required: false
    },
    shopAdminId: {
        type: String,
        required: false
    },
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
        required: true
    },
    conversationId: {
        type: String,
        required: true
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
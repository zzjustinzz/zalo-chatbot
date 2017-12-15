'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * ShopSchema Schema
 */
var ShopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    oa_id: {
        type: String,
        required: true,
        unique: true
    },
    oa_secret: {
        type: String,
        required: true
    },
    custom: {}
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
ShopSchema.statics.load = function(id, cb) {
    this.findOne({
            _id: id
        })
        .exec(cb);
};

mongoose.model('Shop', ShopSchema);
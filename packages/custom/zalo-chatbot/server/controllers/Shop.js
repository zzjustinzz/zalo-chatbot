'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Shop = mongoose.model('Shop'),
    _ = require('lodash');
var Client = require('node-rest-client').Client;
var restClient = new Client();

/**
 * Find shop by id
 */
exports.shop = function(req, res, next, id) {
    Shop.load(id, function(err, shop) {
        if (err) return next(err);
        if (!shop) return next(new Error('Failed to load shop ' + id));
        req.shop = shop;
        next();
    });
};

/**
 * Create an shop or update exist shop
 */
exports.create = function(req, res) {
    Shop.findOneAndUpdate({
        oa_id: req.body.oa_id
    }, req.body, {
        upsert: true,
        new: true
    }).exec(function(err, shop) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot upsert the shop'
            });
        }
        res.json(shop);
    });
};

/**
 * Update an shop
 */
exports.update = function(req, res) {
    var shop = req.shop;

    shop = _.extend(shop, req.body);

    shop.save(function(err) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot update the shop'
            });
        }
        res.json(shop);
    });
};

/**
 * Delete an shop
 */
exports.destroy = function(req, res) {
    var shop = req.shop;

    shop.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the shop'
            });
        }
        res.json(shop);
    });
};

/**
 * Show an shop
 */
exports.show = function(req, res) {
    res.json(req.shop);
};

/**
 * List of shops
 */
exports.all = function(req, res) {
    Shop.find().exec(function(err, shops) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot list the shops'
            });
        }
        res.json(shops);
    });
};


/**
 * FInd One Shop
 */
exports.find_one_shop = function(req, res) {
    Shop.findOne({
        oa_id: req.query.oa_id
    }).exec(function(err, shop) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot find the shop'
            });
        }
        res.json(shop);
    });
};
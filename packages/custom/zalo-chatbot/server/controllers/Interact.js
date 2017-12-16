'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Interact = mongoose.model('Interact'),
    _ = require('lodash');
var Client = require('node-rest-client').Client;
var restClient = new Client();

/**
 * Find interact by id
 */
exports.interact = function(req, res, next, id) {
    Interact.load(id, function(err, interact) {
        if (err) return next(err);
        if (!interact) return next(new Error('Failed to load interact ' + id));
        req.interact = interact;
        next();
    });
};

/**
 * Create an interact or update exist interact
 */
exports.create = function(req, res) {
    var interact = new Interact(req.body);

    interact.save(function(err) {
        if (err) {
            return res.status(500);
        }
        res.jsonp(interact);
    });
};

/**
 * Update an interact
 */
exports.update = function(req, res) {
    var interact = req.interact;

    interact = _.extend(interact, req.body);

    interact.save(function(err) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot update the interact'
            });
        }
        res.json(interact);
    });
};

/**
 * Delete an interact
 */
exports.destroy = function(req, res) {
    var interact = req.interact;

    interact.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the interact'
            });
        }
        res.json(interact);
    });
};

/**
 * Show an interact
 */
exports.show = function(req, res) {
    res.json(req.interact);
};

/**
 * List of interacts
 */
exports.all = function(req, res) {
    Interact.find().exec(function(err, interacts) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot list the interacts'
            });
        }
        res.json(interacts);
    });
};


/**
 * FInd One interact
 */
exports.find_one_interact = function(req, res) {
    Interact.findOne({
        _id: req.query._id
    }).exec(function(err, interact) {
        if (err) {
            console.log(err);
            return res.json(500, {
                error: 'Cannot find the interact'
            });
        }
        res.json(interact);
    });
};
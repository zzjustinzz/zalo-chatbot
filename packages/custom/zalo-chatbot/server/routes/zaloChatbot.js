(function() {
    'use strict';

    var shop = require('../controllers/Shop');
    var interact = require('../controllers/Interact');
    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(5100);
    var config = require('meanio').getConfig();

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(ZaloChatbot, app, auth, database, circles) {

        // server.listen(config.socketPort, function() {
        //     console.log('Socket in package started at ' + config.socketPort);
        // });

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/zaloChatbot/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/zaloChatbot/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/zaloChatbot/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/zaloChatbot/example/render', function(req, res) {
            ZaloChatbot.render('index', {
                package: 'zalo-chatbot'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });

        interact.init(io);

        app.get('/api/configs', function(req, res) {
            res.send(config);
        });

        //Shop
        app.route('/api/shops/find_one_shop')
            .get(shop.find_one_shop);
        app.route('/api/shops')
            .get(shop.all)
            .post(shop.create);
        app.route('/api/shops/:shopId')
            .get(shop.show)
            .put(shop.update)
            .delete(shop.destroy);
        app.param('shopId', shop.shop);

        //Interact
        app.route('/api/interacts/get_interacts_conversation')
            .get(interact.get_interacts_conversation);
        app.route('/api/interacts/get_interacts_time')
            .get(interact.get_interacts_time);
        app.route('/api/interacts/find_one_interact')
            .get(interact.find_one_interact);
        app.route('/api/interacts')
            .get(interact.all)
            .post(interact.create);
        app.route('/api/interacts/:interactId')
            .get(interact.show)
            .put(interact.update)
            .delete(interact.destroy);
        app.param('interactId', interact.interact);
    };
})();
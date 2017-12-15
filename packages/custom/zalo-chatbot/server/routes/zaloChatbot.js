(function() {
    'use strict';

    var shop = require('../controllers/Shop');

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(ZaloChatbot, app, auth, database, circles) {

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
    };
})();
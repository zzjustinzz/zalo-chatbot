'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var ZaloChatbot = new Module('zalo-chatbot');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
ZaloChatbot.register(function(app, auth, database, circles) {

    //We enable routing. By default the Package Object is passed to the routes
    ZaloChatbot.routes(app, auth, database, circles);

    //We are adding a link to the main menu for all authenticated users

    ZaloChatbot.menus.add({
        title: 'Create Shop',
        link: 'create shop',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
      //Uncomment to use. Requires meanio@0.3.7 or above
      // Save settings with callback
      // Use this for saving data from administration pages
      ZaloChatbot.settings({
          'someSetting': 'some value'
      }, function(err, settings) {
          //you now have the settings object
      });

      // Another save settings example this time with no callback
      // This writes over the last settings.
      ZaloChatbot.settings({
          'anotherSettings': 'some value'
      });

      // Get settings. Retrieves latest saved settigns
      ZaloChatbot.settings(function(err, settings) {
          //you now have the settings object
      });
      */

    return ZaloChatbot;
});
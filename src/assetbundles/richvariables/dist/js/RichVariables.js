/**
 * Rich Variables plugin for Craft CMS
 *
 * Rich Variables JS
 *
 * @author    nystudio107
 * @copyright Copyright (c) 2017 nystudio107
 * @link      https://nystudio107.com
 * @package   RichVariables
 * @since     1.0.0
 */

if (!RedactorPlugins) var RedactorPlugins = {};

// Grab the globals set Reference Tags from our controller
var request = new XMLHttpRequest();
request.open('GET', Craft.getActionUrl('/rich-variables'), false);
request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
    } else {
    }
};
request.send();

// Add our Redactor plugin
RedactorPlugins.richvariables = function() {
    return {
        init: function() {
            var dropdown = {};
            var responseVars = JSON.parse(request.responseText);
            var _this = this;

            // Iterate through each menu item, adding them to our dropdown
            responseVars.variablesList.forEach(function(menuItem, index) {
                var key = 'point' + (index + 1);
                dropdown[key] = {
                    title: menuItem.title,
                    func: function(buttonName) {
                        this.insert.raw('<ins>' + menuItem.text + '</ins>');
                    },
                };
            });
            // Handle empty menu items
            if (responseVars.variablesList.length === 0) {
                dropdown.point1 = {
                    title: "No Globals Found",
                    func: function(buttonName) {
                        // NOP
                    },
                };
            }
            // Add the button and dropdown
            var button = this.button.add('variables', 'Variables');
            this.button.addDropdown(button, dropdown);
            if (responseVars.useIconForMenu)
                this.button.setIcon(button, '<img src="' + responseVars.menuIconUrl + '" height="16" width="16" style="margin-top: -2px;">');
        },
    };
};
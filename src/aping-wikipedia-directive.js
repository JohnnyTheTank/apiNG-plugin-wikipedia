"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-wikipedia
 @licence MIT
 */

angular.module("jtt_aping_wikipedia", [])
    .directive('apingWikipedia', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingWikipedia, "wikipedia", appSettings);

                requests.forEach(function (request) {

                    var resultArray = [];

                    //fill resultArray;

                    apingController.concatToResults(resultArray);

                });
            }
        }
    }]);
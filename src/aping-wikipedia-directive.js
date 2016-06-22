"use strict";

angular.module("jtt_aping_wikipedia", ['jtt_wikipedia'])
    .directive('apingWikipedia', ['apingWikipediaHelper', 'apingUtilityHelper', 'wikipediaFactory', function (apingWikipediaHelper, apingUtilityHelper, wikipediaFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingWikipedia, apingWikipediaHelper.getThisPlatformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };

                    if (angular.isDefined(appSettings.getNativeData)) {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call

                    var requestObject = {
                        pithumbsize: 700,
                    };

                    if (angular.isDefined(request.items)) {
                        requestObject.gsrlimit = request.items;
                    } else {
                        requestObject.gsrlimit = appSettings.items;
                    }

                    if (requestObject.gsrlimit === 0 || requestObject.gsrlimit === '0') {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.gsrlimit < 0 || isNaN(requestObject.gsrlimit)) {
                        requestObject.gsrlimit = undefined;
                    }

                    // the api has a limit of 500 items per request
                    if (requestObject.gsrlimit > 500) {
                        requestObject.gsrlimit = 500;
                    }

                    if (angular.isDefined(request.language)) {
                        requestObject.lang = request.language;
                    }

                    if (angular.isDefined(request.title)) {
                        requestObject.term = request.title;
                        wikipediaFactory.getArticle(requestObject)
                            .then(function (_data) {
                                if (_data) {
                                    apingController.concatToResults(apingWikipediaHelper.getObjectByJsonData(_data, helperObject));
                                }
                            });
                    } else if (angular.isDefined(request.search)) {
                        requestObject.term = request.search;

                        if (angular.isDefined(request.textSearch) && (request.textSearch === 'true' || request.textSearch === true)) {
                            wikipediaFactory.searchArticles(requestObject)
                                .then(function (_data) {
                                    if (_data) {
                                        apingController.concatToResults(apingWikipediaHelper.getObjectByJsonData(_data, helperObject));
                                    }
                                });
                        } else {
                            wikipediaFactory.searchArticlesByTitle(requestObject)
                                .then(function (_data) {
                                    if (_data) {
                                        apingController.concatToResults(apingWikipediaHelper.getObjectByJsonData(_data, helperObject));
                                    }
                                });
                        }
                    }
                });
            }
        }
    }]);
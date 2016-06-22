"use strict";

angular.module("jtt_aping_wikipedia")
    .service('apingWikipediaHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
        this.getThisPlatformString = function () {
            return "wikipedia";
        };

        this.getThisPlatformLink = function (_lang) {
            return 'https://'+_lang+'.wikipedia.org/wiki/';
        };

        this.getObjectByJsonData = function (_data, _helperObject) {

            var requestResults = [];
            if (_data && _data.data && _data.data.query && _data.data.query.pages) {
                var _this = this;

                if (_data.data.query.pages) {

                    angular.forEach(_data.data.query.pages, function (value, key) {
                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = value;
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject.model);
                        }
                        if (tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }

            }
            return requestResults;
        };

        this.getItemByJsonData = function (_item, _model) {
            var returnObject = {};
            if (_item && _model) {
                switch (_model) {
                    case "social":
                        returnObject = this.getSocialItemByJsonData(_item);
                        break;
                    /*
                    case "image":
                        returnObject = this.getImageItemByJsonData(_item);
                        break;
                    */
                    default:
                        return false;
                }
            }
            return returnObject;
        };

        this.getSocialItemByJsonData = function (_item) {
            var socialObject = apingModels.getNew("social", this.getThisPlatformString());

            //fill _item in socialObject
            angular.extend(socialObject, {
                //blog_name: undefined,
                //blog_id: undefined,
                //blog_link: undefined,
                //type: undefined,
                timestamp: apingTimeHelper.getTimestampFromDateString(_item.touched, 1000, 3600 * 1000),
                post_url: _item.pagelanguage ? this.getThisPlatformLink(_item.pagelanguage) + encodeURI(_item.title) : undefined,
                intern_id: _item.pageid,
                text: apingUtilityHelper.getTextFromHtml(_item.extract),
                caption: _item.title,
                img_url: _item.thumbnail ? _item.thumbnail.source : undefined,
                thumb_url: _item.thumbnail ? _item.thumbnail.source : undefined,
                native_url: _item.thumbnail ? _item.thumbnail.source : undefined,
                source: _item.extract,
                //likes: undefined,
                //shares: undefined,
                //comments: undefined,
                position: _item.index
            });

            socialObject.date_time = new Date(socialObject.timestamp);

            return socialObject;
        };

        /*
        this.getImageItemByJsonData = function (_item) {
            var imageObject = apingModels.getNew("image", this.getThisPlatformString());

            //fill _item in imageObject
            angular.extend(imageObject, {
                blog_name: undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                blog_id: undefined, //ID of channel / page / account, ...
                blog_link: undefined, //link to channel / uploader / page / account, ...
                timestamp: undefined,
                date_time: undefined,
                post_url: undefined, //URL to the  image ...
                intern_id: undefined, // INTERN ID of image (facebook id, instagram id, ...)
                text: undefined,
                caption: undefined,
                thumb_url: undefined, // best case 200px
                thumb_width: undefined,
                thumb_height: undefined,
                img_url: undefined, // best case 700px
                img_width: undefined,
                img_height: undefined,
                native_url: undefined,
                native_width: undefined,
                native_height: undefined,
                source: undefined,
                likes: undefined,
                shares: undefined,
                comments: undefined,
                position: undefined,
            });

            imageObject.date_time = new Date(imageObject.timestamp);

            return imageObject;
        };
        */
    }]);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = exports.getTimeDeference = exports.toMonth = exports.createOTP = void 0;
var createOTP = function (length) {
    var min = Math.pow(10, length - 1);
    var max = Math.pow(10, length);
    return Math.floor(Math.random() * (max - min) + min);
};
exports.createOTP = createOTP;
var toMonth = function (month) {
    switch (month) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
    }
};
exports.toMonth = toMonth;
var getTimeDeference = function (time1, time2) {
    var diff = (time2.getTime() - time1.getTime()) / 1000;
    return Math.abs(Math.round(diff));
};
exports.getTimeDeference = getTimeDeference;
var getDistance = function (lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    }
    else {
        var radLat1 = (Math.PI * Number(lat1)) / 180;
        var radLat2 = (Math.PI * lat2) / 180;
        var theta = Number(lon1) - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist = Math.sin(radLat1) * Math.sin(radLat2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }
};
exports.getDistance = getDistance;

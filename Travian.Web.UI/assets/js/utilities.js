'use strict';

// calculate distance between two vectors. 
function distance(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2.0) + Math.pow(v1.y - v2.y, 2.0));
}

// calculate the distance (in time) in travian between two villages
function calcTravianDistance(fromVillage, toVillage, unitSpeed, tournament) {
    var d = distance(fromVillage, toVillage);
    var t = 0.0; // hours (with decimals) of traveltime

    if (d <= 20.0) {
        t = d / unitSpeed;
    } else {
        t = 20.0 / unitSpeed + (d - 20.0) / (unitSpeed * tournament / 100.0);
    }

    // TODO: check return values!!
    var days = Math.floor(parseInt(Number(t)) / 24);
    var hrs = parseInt(Number(t - days * 24));
    var minTot = (Number(t - days * 24) - hrs) * 60;
    var min = Math.floor(minTot);
    var sec = Math.round((minTot - min) * 60);

    return paramsToString(days, hrs, min, sec);
}

// get the time difference of two date objects in the format d:hh:mm:ss
function getTimeDifference(time1, time2) {
    // Convert both dates to milliseconds
    var time1_ms = new Date(time1).getTime();
    var time2_ms = new Date(time2).getTime();

    // Calculate the difference in milliseconds
    var difference_ms = time1_ms - time2_ms;
    var p = millisecondsToParams(difference_ms);

    return paramsToString(p.days, p.hours, p.minutes, p.seconds);
}

// parse time values to a nice string representation 'd:hh:mm:ss'
function paramsToString(days, hours, minutes, seconds) {
    var d = days === 0 ? "" : days + ":";
    var h = ("0" + hours).slice(-2) + ":";
    var m = ("0" + minutes).slice(-2) + ":";
    var s = ("0" + seconds).slice(-2) + "";

    return d + h + m + s;
}

// parse the nice string representation, 'd:hh:mm:ss', to milliseconds
function stringToMilliseconds(t) {
    var ms = 0;
    var parts = t.split(':');
    if (parts.length === 4) {
        ms += parts[0] * 1000 * 60 * 60 * 24; // days
        parts.shift(); // remove first element and shift
    }

    ms += parts[0] * 1000 * 60 * 60; // hours
    ms += parts[1] * 1000 * 60; // minutes
    ms += parts[2] * 1000; // seconds

    return ms;
}

// return milliseconds to (days, hours, minutes, seconds)-object
function millisecondsToParams(ms) {
    var one_day = 1000 * 60 * 60 * 24;
    var one_hour = one_day / 24;
    var one_minute = one_hour / 60;
    var one_second = one_minute / 60;

    var days = Math.round(ms / one_day);
    var hours = Math.floor((ms -days * one_day) / one_hour);
    var minutes = Math.floor((ms - days * one_day - hours * one_hour) / one_minute);
    var seconds = Math.round((ms - days * one_day - hours * one_hour - minutes * one_minute) / one_second);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

// convert d:hh:mm:ss string to param value
function stringToParams(s) {
    return millisecondsToParams(stringToMilliseconds(s));
}

// format date to pretty nice string "dd/mm -yy hh:mm:ss"
function dateToString(date) {
    return date.getDate() + "/" + date.getMonth() + " " + // " -" + date.getFullYear().toString().substr(2, 2) + " " +
            ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
}

// function used for testing test
function getDouble(a) {
    return 2 * a;
}
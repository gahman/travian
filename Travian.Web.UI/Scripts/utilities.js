'use strict';

// calculate time distance between two villages. 
function distance(fromVillage, toVillage) {
    return Math.sqrt(Math.pow(fromVillage.x - toVillage.x, 2.0) + Math.pow(fromVillage.y - toVillage.y, 2.0));
}

// calculate the distance in travian in time. Tournament and unit speed are taken from the village objects.
function calcTravianDistance(fromVillage, toVillage) {
    var d = distance(fromVillage, toVillage);
    var t = 0.0;

    if (d <= 20.0) {
        t = d / fromVillage.speed;
    } else {
        t = 20.0 / fromVillage.speed + (d - 20.0) / (fromVillage.speed * fromVillage.tournament / 100.0);
    }

    // TODO: check return values!!
    return convertToHHMM(t);
}

function convertToHHMM(info) {
    var hrs = parseInt(Number(info));
    var minTot = (Number(info) - hrs) * 60;
    var min = Math.floor(minTot);
    var sec = Math.round((minTot - min) * 60);
    return hrs + ':' + min + ':' + sec;
}
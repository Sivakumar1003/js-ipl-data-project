// Extra runs conceded per team in the year 2016

const fs = require('fs');
const makeObject = require('../util.js')
const deliveriesData = makeObject('./src/data/deliveries.csv');
const matchesData = makeObject('./src/data/matches.csv');
const year = 2016;


function runConcededPerTeam(deliveriesData, matches, year) {
    let matchesIds = [];
    let bowlingTeam = {};

    // get all matches id in 2016.
    for( let match of matchesData) {
        if ( match["season"] == year) {
            matchesIds.push(match["id"]);
        }
    }

    // based on match ids get all deliveries and get bowling team how run conceded.
    for( let deliveries of deliveriesData) {
        if(isExists(matchesIds, deliveries["match_id"])){
            if(bowlingTeam[deliveries["bowling_team"]] == undefined) {
                bowlingTeam[deliveries["bowling_team"]] = 0;
            }

            bowlingTeam[deliveries["bowling_team"]] += parseInt(deliveries["extra_runs"]);
        }
    }

    // all teams runs conceded count.
    return bowlingTeam;
}

// function for check already exists or not.
function isExists (array , value) {
    for (let data of array) {
        if (data == value) {
            return true;
        }
    }
    return false;
}

fs.writeFileSync('./src/public/output/runConcededPerTeam.json', JSON.stringify(runConcededPerTeam(deliveriesData, matchesData, year)));
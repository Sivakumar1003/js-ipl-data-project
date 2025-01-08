// Top 10 economical bowlers

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');
const deliveriesData = makeObject('./src/data/deliveries.csv');

// decelar year.
const year = 2015;

// function to get top ten economic bowler.
function topTenEconomicalBowlers(matchData, deliveriesData, year) {
    const matchIds = [];
    const allBowlers = {};
    const economicalRunRate = [];
    const topTenEconomicalBowler = [];

    // find match id in the year.
    for (let match of matchData) {
        if (match["season"] == year) {
            matchIds.push(match["id"]);
        }
    }

    // based on match id get all bowlers total balls and runs.
    for (let delivery of deliveriesData) {

        if (isExists(matchIds, delivery["match_id"])) {
            let bowler = delivery["bowler"]
            if (allBowlers[bowler] === undefined) {
                allBowlers[bowler] = {'ball': 0, 'run':0};
            }

            if (delivery["wide_runs"] == 0 && delivery["noball_runs"] == 0) {
                allBowlers[bowler]["ball"] += 1;
            }

            allBowlers[bowler]["run"] += parseInt(delivery["total_runs"]) - (parseInt(delivery["legbye_runs"]) + parseInt(delivery["bye_runs"]));

        }
    }

    // bassed on all bowlers details calculate economic bowl run rate.
    for ( let bowler in allBowlers) {
        let overs = allBowlers[bowler]["ball"] / 6;
        let economic = allBowlers[bowler]["run"] / overs;
        economicalRunRate.push({'bowler':bowler, 'economicRun': economic})
    }

    //sort by economic run rate.
    sortAray(economicalRunRate);

    // get only top ten.
    for (let index1=0; index1<10; index1++) {
        topTenEconomicalBowler.push(economicalRunRate[index1]);
    }

    // returning top ten bowler.
    return topTenEconomicalBowler;
}

// function for sort by econimic run rate.
function sortAray( array) {
    for (let index1=0; index1< array.length-1; index1++) {
        for (let index2 = index1+1; index2<array.length; index2++) {
            if(array[index1]["economicRun"] > array[index2]["economicRun"]) {
                let temp = array[index1];
                array[index1] = array[index2];
                array[index2] = temp;
            }
        }
    }
    return array;
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

fs.writeFileSync('./src/public/output/topTenEconomicalBowlers.json', JSON.stringify(topTenEconomicalBowlers(matchData, deliveriesData, year)));
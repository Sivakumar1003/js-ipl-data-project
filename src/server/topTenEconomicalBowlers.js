// Top 10 economical bowlers

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');
const deliveriesData = makeObject('./src/data/deliveries.csv');

// decelar year.
const year = 2015;

// function to get top ten economic bowler.
function topTenEconomicalBowlers(matchData, deliveriesData, year) {
    // get match ids based on year.
    const matchIds = matchData.filter(match => {
        return match["season"] == year;
    })
    .map((match) => {
        return match["id"];
    })

    // based on match ids get bowlers ball and run.
    const allBowlers = deliveriesData.filter(deliveries => {
        return matchIds.includes(deliveries["match_id"]);
    })
    .reduce((allBowlers, deliveries) => {
        let bowler = deliveries["bowler"];
        if (allBowlers[bowler] == undefined) {
            allBowlers[bowler] = { 'balls': 0, 'runs': 0 };
        }
        if (deliveries["wide_runs"] == 0 && deliveries["noball_runs"] == 0) {
            allBowlers[bowler]["balls"] += 1;
        }
        allBowlers[bowler]["runs"] += parseInt(deliveries["total_runs"]) -
            (parseInt(deliveries["legbye_runs"]) + parseInt(deliveries["bye_runs"]));
        return allBowlers;
    }, {})

    // based on all balls and runs calculate economic.
    let economicBolwer = Object.entries(allBowlers).map(bowler => {
        let overs = bowler[1]["balls"] / 6;
        let economic = bowler[1]["runs"] / overs;
        return {'bowler': bowler[0], 'economicRun': economic};
    });

    // sort and return the top ten economic bowler.
    return economicBolwer.sort((player1, player2) => {
        return player1["economicRun"] - player2["economicRun"];
    }).splice(0,10);
}

fs.writeFileSync('./src/public/output/topTenEconomicalBowlers.json', JSON.stringify(topTenEconomicalBowlers(matchData, deliveriesData, year)));
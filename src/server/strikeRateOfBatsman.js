// Find the strike rate of a batsman for each season

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');
const deliveriesData = makeObject('./src/data/deliveries.csv');

// function to get strike rate of batsman for each season.
function strikeRateOfBatsman(matchData, deliveriesData) {
    let seasonOfMatch = {};     // { id: year}
    let seasonOfPlayerData = {};  // {year : { batsman : {run , balls }}} 

    // get all match id as key and season as value.
    for (let match of matchData) {
        seasonOfMatch[match["id"]] = match["season"];
    }

    // calculate all indivual delivery in which season and batsman.
    for(let delivery of deliveriesData) {
        let year = seasonOfMatch[delivery["match_id"]];
        let batsman = delivery["batsman"]

        if(seasonOfPlayerData[year] == undefined) {
            seasonOfPlayerData[year] = {};
            seasonOfPlayerData[year][batsman] = {'run':0, 'ball': 0}
        } else if (seasonOfPlayerData[year][batsman] == undefined) {
            seasonOfPlayerData[year][batsman] = {'run':0, 'ball': 0}
        }

        seasonOfPlayerData[year][batsman]["run"] += parseInt(delivery["batsman_runs"]);

        if(delivery["wide_runs"] == 0 && delivery["noball_runs"] == 0) {
            seasonOfPlayerData[year][batsman]["ball"] += 1;
        }
    }


    // convert bats run into strickrate.
    for( let season in seasonOfPlayerData) {
        for(let player in seasonOfPlayerData[season]) {
            let run = seasonOfPlayerData[season][player]["run"];
            let ball = seasonOfPlayerData[season][player]["ball"];
            let strikeRate = run/ball*100;
            seasonOfPlayerData[season][player] = strikeRate.toFixed(2);
        }
    }

    return seasonOfPlayerData;
}

fs.writeFileSync('./src/public/output/strikeRateOfBatsman.json', JSON.stringify(strikeRateOfBatsman(matchData, deliveriesData)));
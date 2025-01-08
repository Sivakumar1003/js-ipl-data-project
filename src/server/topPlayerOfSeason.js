// Find a player who has won the highest number of Player of the Match awards for each season

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');

// function to get top player of the season for every year.
function topPlayerOfSeason(matchData) {
    const topPlayerOfEverySeason = {};

    // get all players award count for each year.
    for ( let match of matchData) {
        let year = match["season"];
        let player = match["player_of_match"];

        if(topPlayerOfEverySeason[year] === undefined) {
            topPlayerOfEverySeason[year] = {};
            topPlayerOfEverySeason[year][player] = 1;
        } else if (topPlayerOfEverySeason[year][player] === undefined) {
            topPlayerOfEverySeason[year][player] = 1;
        } else {
            topPlayerOfEverySeason[year][player] += 1;
        }
    }

    // get maximum awarded player of each year.
    for (let season in topPlayerOfEverySeason) {
        players = topPlayerOfEverySeason[season];
        let maximumAward = 0;
        let playyerName = "";

        for( let player in players) {
            if ( maximumAward < players[player]) {
                maximumAward = players[player];
                playyerName = player;
            }
        }
        topPlayerOfEverySeason[season] = playyerName;
    }

    // returning the result of top player of all season.
    return topPlayerOfEverySeason;
}

fs.writeFileSync('./src/public/output/topPlayerOfSeason.json', JSON.stringify(topPlayerOfSeason(matchData)));
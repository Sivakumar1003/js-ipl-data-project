// Find the strike rate of a batsman for each season

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');
const deliveriesData = makeObject('./src/data/deliveries.csv');

// function to get strike rate of batsman for each season.
function strikeRateOfBatsman(matchData, deliveriesData) {
    //  To identify all match useing ids.
    const MatchIds = matchData.reduce((allMatch, match) => {
        allMatch[match["id"]] = match["season"];
        return allMatch;
    }, {});

    const seasonOfPlayerData = deliveriesData.reduce((allBatsman, deliveries) => {
        let year = MatchIds[deliveries["match_id"]]
        if(allBatsman[year] == undefined) {
            allBatsman[year] = {};
            allBatsman[year][deliveries["batsman"]] = {'runs':0, 'balls':0};
        } else if (allBatsman[year][deliveries["batsman"]] == undefined) {
            allBatsman[year][deliveries["batsman"]] = {'runs':0, 'balls':0};
        }

        allBatsman[year][deliveries["batsman"]]["runs"] += parseInt(deliveries["batsman_runs"]);

        if(deliveries["wide_runs"] == 0 && deliveries["noball_runs"] == 0) {
            allBatsman[year][deliveries["batsman"]]["balls"] += 1;
        }
        return allBatsman;
    },{})
    
    return Object.entries(seasonOfPlayerData).reduce((allSeasonData, [season, players]) => {
        let strikeData = Object.entries(players).reduce((allPlayers, [player, ballsAndRuns]) => {
            let strikeRate = ballsAndRuns["runs"] / ballsAndRuns["balls"] * 100;
            allPlayers[player] = strikeRate.toFixed(2);
            return allPlayers;
        },{});
        allSeasonData[season] = strikeData;
        return allSeasonData;
    }, {})
}

fs.writeFileSync('./src/public/output/strikeRateOfBatsman.json', JSON.stringify(strikeRateOfBatsman(matchData, deliveriesData)));
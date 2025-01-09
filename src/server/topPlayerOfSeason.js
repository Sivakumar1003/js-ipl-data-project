// Find a player who has won the highest number of Player of the Match awards for each season

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');

// function to get top player of the season for every year.
function topPlayerOfSeason(matchData) {
    // calculate all players award count by per season.
    const SeasonData = matchData.reduce((allMatch, match) => {
        if (allMatch[match["season"]] == undefined) {
            allMatch[match["season"]] = {};
        }
        allMatch[match["season"]][match["player_of_match"]] == undefined ?
            allMatch[match["season"]][match["player_of_match"]] = 1 : allMatch[match["season"]][match["player_of_match"]] += 1;
        return allMatch;
    }, {});
    
    // return most awarded player in per season.
    return Object.entries(SeasonData).reduce((allSeason, [season, players]) => {
        let topPlayer = Object.entries(players).reduce((topPlayer, [player, count]) => {
            if(count > topPlayer["count"]){
                topPlayer["name"] = player;
                topPlayer["count"] = count;
            }
            return topPlayer
        }, {'name':"", 'count':0});
        allSeason[season] = topPlayer["name"];
        return allSeasonb
    }, {})
}

fs.writeFileSync('./src/public/output/topPlayerOfSeason.json', JSON.stringify(topPlayerOfSeason(matchData)));
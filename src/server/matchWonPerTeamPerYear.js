const fs = require('fs');
const makeObject = require('../util.js')
const data = makeObject('./src/data/matches.csv');

// function to get match won by per year per team.
function matchWonPerTeamPerYear(data) {

    return data.reduce((seasonResult, match) => {
        let winner = match["winner"];

        // check the match is draw or won.
        if (winner) {
            if (seasonResult[match["season"]] === undefined) {
                seasonResult[match["season"]] = {};
            }

            seasonResult[match["season"]][winner] === undefined ?
                seasonResult[match["season"]][winner] = 1 : seasonResult[match["season"]][winner] += 1;
        }
        return seasonResult;
    }, {})
}
fs.writeFileSync('./src/public/output/matchWonPerTeamPerYear.json', JSON.stringify(matchWonPerTeamPerYear(data)));
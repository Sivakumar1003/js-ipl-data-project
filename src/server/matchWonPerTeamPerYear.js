const fs = require('fs');
const makeObject = require('../util.js')
const data = makeObject('./src/data/matches.csv');

// function to get match won by per year per team.
function matchWonPerTeamPerYear(data) {
    let teamsResult = {};
    for (let match of data) {
        let winner = match["winner"];
        let year = match["season"];

        // check winner is there or draw match.
        if (winner) {
            if (teamsResult[year] === undefined) {
                teamsResult[year] = {}
                teamsResult[year][winner] = 1;
            } else if (teamsResult[year][winner] == undefined) {
                teamsResult[year][winner] = 1;
            } else {
                teamsResult[year][winner] += 1;
            }
        }
    }

    // returning teamsResult.
    return teamsResult;
}

fs.writeFileSync('./src/public/output/matchWonPerTeamPerYear.json', JSON.stringify(matchWonPerTeamPerYear(data)));
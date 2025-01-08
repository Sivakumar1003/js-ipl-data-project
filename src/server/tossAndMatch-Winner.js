// Find the number of times each team won the toss and also won the match

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');

// function to get who wins both match and toss.
function tossAndMatchWinner(matchData) {
    const tossAndMatch = {};

    //  check each match one by one.
    for (let match of matchData) {
        if (match["toss_winner"] === match["winner"]) {
            if(tossAndMatch[match["toss_winner"]] == undefined) {
                tossAndMatch[match["toss_winner"]] = 1;
            } else {
                tossAndMatch[match["toss_winner"]] += 1;
            }
        }
    }

    // returning the result of who all are win match and toss.
    return tossAndMatch;
}

fs.writeFileSync('./src/public/output/tossAndMatchWinner.json', JSON.stringify(tossAndMatchWinner(matchData)));
// Find the number of times each team won the toss and also won the match

const fs = require('fs');
const makeObject = require('../util.js')
const matchData = makeObject('./src/data/matches.csv');

// function to get who wins both match and toss.
function tossAndMatchWinner(matchData) {
    return matchData.reduce((matchAndToss, match) => {
        // check match winner and toss winner are same.
        if (match["toss_winner"] == match["winner"]) {
            matchAndToss[match["winner"]] == undefined ?
                matchAndToss[match["winner"]] = 1 : matchAndToss[match["winner"]] += 1;
        }
        return matchAndToss;
    }, {})
}

fs.writeFileSync('./src/public/output/tossAndMatchWinner.json', JSON.stringify(tossAndMatchWinner(matchData)));
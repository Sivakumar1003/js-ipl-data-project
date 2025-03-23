// Find the highest number of times one player has been dismissed by another player

const fs = require('fs');
const makeObject = require('../util.js')
const deliveriesData = makeObject('./src/data/deliveries.csv');

// function to get highest number of times one player has been dismissed by another player.
function playerDismissedByOther(deliveriesData) {
    playerData = {};

    // get based batsman dismissed bowler and there count.
    for (let deliveries of deliveriesData) {
        let batsman = deliveries["player_dismissed"];
        let bowler = deliveries["bowler"];
        if (batsman) {
            if (playerData[batsman] == undefined) {
                playerData[batsman] = {}
                playerData[batsman][bowler] = 0;
            } else if (playerData[batsman][bowler] == undefined) {
                playerData[batsman][bowler] = 0;
            }
            
            playerData[batsman][bowler] += 1;
        }
    }
    
    // based on playerData get highest dismissal teaken bowler for each batsman.
    for (let batsman in playerData) {
        let allBowlers = playerData[batsman];
        let dismissedCount = -Infinity;
        let bowler = "";
        for (let player in allBowlers) {
            if (dismissedCount < playerData[batsman][player]) {
                dismissedCount = playerData[batsman][player];
                bowler = player;
            }
        }
        playerData[batsman] = {'bowler': bowler, 'dismissedCount': dismissedCount};
    }

    // returning all batsman with highest dismissal teaken bowler for each batsman.
    return playerData;
}
fs.writeFileSync('./src/public/output/playerDismissedByOther.json', JSON.stringify(playerDismissedByOther(deliveriesData)));
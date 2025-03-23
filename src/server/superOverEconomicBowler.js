// Find the bowler with the best economy in super overs.

const fs = require('fs');
const makeObject = require('../util.js')
const deliveriesData = makeObject('./src/data/deliveries.csv');

// function to get best economic bowler.
function superOverEconomicBowler(deliveriesData) {
    const superOverData = {};

    // To get balls and run who delivered in Super overs 
    for (let deliveries of deliveriesData) {
        if (deliveries["is_super_over"] != 0) {
            if(superOverData[deliveries["bowler"]] == undefined) {
                superOverData[deliveries["bowler"]] = {'balls':0, 'runs':0};
            }

            superOverData[deliveries["bowler"]]["runs"] += parseInt(deliveries["total_runs"]);

            if(deliveries["wide_runs"] == 0 && deliveries["noball_runs"] == 0) {
                superOverData[deliveries["bowler"]]["balls"] += 1;
            }
        }
    }
    
    // get best ecnomic bowler in superOverData.
    let minimumEconomic = Infinity;
    let econimicBowler = "";
    for(let bowler in superOverData) {
        let overs = superOverData[bowler]["balls"] / 6;
        let econimic = superOverData[bowler]["runs"] / overs;
        
        if(econimic < minimumEconomic) {
            minimumEconomic = econimic;
            econimicBowler = bowler;
        }
    }

    // returning best economy in super overs
    return {'bowler': econimicBowler, 'economicRate': minimumEconomic};
}

fs.writeFileSync('./src/public/output/superOverEconomicBowler.json', JSON.stringify(superOverEconomicBowler(deliveriesData)));
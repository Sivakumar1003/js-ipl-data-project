// Number of matches played per year for all the years in IPL.

const fs = require('fs');
const makeObject = require('../util.js')
const matchesData = makeObject('./src/data/matches.csv');

// function to get Number of matches played per year.
function numberOfMatchPerYear(matchesData) {
    let yearData = {};

    // based on year get match count.
    for (let match of matchesData) {
        if (yearData[match["season"]] == undefined) {
            yearData[match["season"]] = 0;
        }

        yearData[match["season"]] += 1;
    }

    // returning match count by year.
    return yearData;
}

fs.writeFileSync('./src/public/output/numberOfMatchPerYear.json', JSON.stringify(numberOfMatchPerYear(matchesData)));
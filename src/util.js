const csv2Json = require('convert-csv-to-json');

function makeObject(path) {

    let rawData = csv2Json.getJsonFromCsv(path);
    let resultArray = [];

    let headers = Object.keys(rawData[0])[0].split(",");

    for(let detail of rawData) {
        let resultObject = {};
        let values = Object.values(detail)[0].split(",");

        for(let index=0; index<values.length; index++) {
            resultObject[headers[index]] = values[index];
        }
        resultArray.push(resultObject)
    }

    return resultArray;
}

module.exports =  makeObject;
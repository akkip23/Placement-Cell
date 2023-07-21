const Json2csvParser = require("json2csv").parse;


async function convertJson2CSV (data) {    

    return await ConvertToCSV(JSON.stringify(data), {fields: ["batch", "name", "email", "mobile", "college", "placement", "dsa_marks", "web_dev", "react", "interview"], unwind: 'interview'});
  
}

function ConvertToCSV(json, fields) {

    let options = {};

    options = fields;

    const csv = Json2csvParser(JSON.parse(json), options);    
    return csv;
}

module.exports = {
  convertJson2CSV: convertJson2CSV
};
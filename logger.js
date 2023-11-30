// A TOOL FOR ADDING MESSAGES TO A LOG FILE
// ========================================

// LIBRARIES
// ----------
const fs = require('fs');

// FUNCTION DEFINITIONS
// -------------------

// Function gets message entry and log file name as arguments
const add2log = (entry, fileName) => {

    // Create a ISO formatted timestamp using Date class
    const isoTimeStamp = new Date().toISOString();

    // Construct a log entry with timestamp and a new line character
    const logRow = entry + '@' + isoTimeStamp + '\n'

    // Append entry to a log file or give an error
    fs.appendFile(fileName, logRow, (err) => {
        if (err) {
            console.log(err);
        }
    })
};

// EXPORT
// ------

module.exports = {
    add2log
}

 
const fs = require("fs"); 
const utility = require('./utility')

$(function() {

    /**
     * Shows a random quote.
     * Reads quotes.txt-file.
     * Generates a random number to pick a random line from the text-file
     */
    $('#btnShowQuote').on('click', () => {
        fs.readFile('quotes.txt', 'utf8', function(err, data) {
            data = data.split("\n");
            const randNum = utility.genRandNum(0,data.length-1);
            $('#pQuote').text(data[randNum]); // show a random quote
        });
    });
});
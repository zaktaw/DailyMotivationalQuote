const fs = require("fs"); 
const utility = require('./utility')

$(function() {
 
    // Only show daily quote if it has not been shown today
    if (!dailyQuoteShown()) showQuote();

    /**
     * Shows a random quote.
     * Reads quotes.txt-file.
     * Generates a random number to pick a random line from the text-file
     */
    function showQuote() {
        fs.readFile('quotes.txt', 'utf8', function(err, data) {
            data = data.split("\n");
            const randNum = utility.genRandNum(0, data.length-1);
            $('#pQuote').text(data[randNum]); // show a random quote
        });

        //update handler.txt
    }

    /**
     * Checks if a quote has been shown today.
     * Gets today's date (1-31).
     * Gets the date the last quote was shown.
     * Returns true if these dates are the same.
     */
    function dailyQuoteShown() {
        let today = new Date().getDate();
        let quoteShownOnDate = fs.readFileSync('quoteShownOnDate.txt', 'utf8');
        if (quoteShownOnDate==today) return true;
        else return false;
    }
});
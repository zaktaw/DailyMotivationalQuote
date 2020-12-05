const fs = require("fs"); 
const utility = require('./utility')

$(function() {

    dailyQuoteShown(); // check if daily quote has been shown

    // get quotes from text file
    let quotes = fs.readFileSync('quotesShuffled.txt', 'utf8');
    quotes = quotes.split("\n");

    showQuote(); // show daily quote

    /**
     * Shows a random quote.
     * Reads quotes.txt-file.
     * Generates a random number to pick a random line from the text-file
     */
    function showQuote() {
        // get quoteHandler JSON
        let quoteHandler = fs.readFileSync('quoteHandler.json');
        quoteHandler = JSON.parse(quoteHandler);
      
        $('#pQuote').text(quotes[quoteHandler.quoteIterator]); // show quote

        // update the date the last quote has been shown in JSON-file
        let today = new Date().getDate();
        quoteHandler.quoteShownOnDate = today;
        quoteHandler = JSON.stringify(quoteHandler);
        fs.writeFileSync('quoteHandler.json', quoteHandler);
    }

    /**
     * Checks if a quote has been shown today.
     * Gets today's date (1-31).
     * Gets the date the last quote was shown.
     * Returns true if these dates are the same.
     */
    function dailyQuoteShown() {
         // get quoteHandler JSON
        let quoteHandler = fs.readFileSync('quoteHandler.json');
        quoteHandler = JSON.parse(quoteHandler);

        // increment iterator if there is a new date and update iterator in JSON-file
        let today = new Date().getDate();
        if (quoteHandler.quoteShownOnDate != today) {
            quoteHandler.quoteIterator += 1;
            quoteHandler = JSON.stringify(quoteHandler);
            fs.writeFileSync('quoteHandler.json', quoteHandler);
        }
    }
});
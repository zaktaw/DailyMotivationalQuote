const fs = require("fs"); 

$(function() {

    dailyQuoteShown(); // check if daily quote has been shown

    // get quotes from text file
    let quotes = fs.readFileSync('quotes.txt', 'utf8');
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

            // set iterator to 0
            if (quoteIterator == quotes.length) {
                quoteHandler.quoteIterator = 0;
                shuffleQuotes();
            }

            quoteHandler = JSON.stringify(quoteHandler);
            fs.writeFileSync('quoteHandler.json', quoteHandler);
        }
    }

    /**
     * Shuffles the quotes and updates quotes txt-file.
     */
    function shuffleQuotes() {
        quotes = shuffle(quotes);
        quotesString = "";
        for (let i=0; i<quotes.length; i++) {
            quotesString += quotes[i] + "\n";
        }
        fs.writeFileSync('quotes.txt', quotesString, 'utf8');
    }

    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
});
const fs = require("fs"); 
const utility = require("./utility");
const path = require('path');

let quotesDirectory = './resources/quotes.txt'
let quotesHandlerDirectory = './resources/quoteHandler.json';

$(function() {

    // get quotes from text file
    let quotes = fs.readFileSync(quotesDirectory, 'utf8');
    quotes = quotes.split("\n");

    dailyQuoteShown(); // check if daily quote has been shown

    showQuote(); // show daily quote

    changeBgColor(); // change background-color of quote-box

    /**
     * Shows a random quote.
     * Reads quotes.txt-file.
     * Generates a random number to pick a random line from the text-file
     */
    function showQuote() {
        // get quoteHandler JSON
        let quoteHandler = fs.readFileSync(quotesHandlerDirectory);
        quoteHandler = JSON.parse(quoteHandler);
      
         // show quote
        let quote = quotes[quoteHandler.quoteIterator];
        quote = JSON.parse(quote);
        $('#quote').html(quote.quote);
        $('#author').html(quote.author);

        // update the date the last quote has been shown in JSON-file
        let today = new Date().getDate();
        quoteHandler.quoteShownOnDate = today;
        quoteHandler = JSON.stringify(quoteHandler);
        fs.writeFileSync(quotesHandlerDirectory, quoteHandler);
    }

    /**
     * Checks if a quote has been shown today.
     * Gets today's date (1-31).
     * Gets the date the last quote was shown.
     * Returns true if these dates are the same.
     */
    function dailyQuoteShown() {
         // get quoteHandler JSON
        let quoteHandler = fs.readFileSync(quotesHandlerDirectory);
        quoteHandler = JSON.parse(quoteHandler);

        // increment iterator if there is a new date and update iterator in JSON-file
        let today = new Date().getDate();
        
        if (quoteHandler.quoteShownOnDate != today) {
            quoteHandler.quoteIterator += 1;

            // set iterator to 0 and shuffle quotes when last quote has been shown
            if (quoteHandler.quoteIterator == quotes.length) {
                quoteHandler.quoteIterator = 0;
                shuffleQuotes();
            }

            // write to file
            quoteHandler = JSON.stringify(quoteHandler);
            fs.writeFileSync(quotesHandlerDirectory, quoteHandler);
        }
    }

    /**
     * Shuffles the quotes and updates quotes txt-file.
     */
    function shuffleQuotes() {
        quotes = shuffle(quotes);
        quotesString = "";
        for (let i=0; i<quotes.length; i++) {
            quotesString += quotes[i];
            if (i < quotes.length-1) quotesString += "\n";
        }
        fs.writeFileSync(quotesDirectory, quotesString, 'utf8');
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

    /**
     * Changes the background color of the quote-box to a random color from an array.
     */
    function changeBgColor() {
        let colors = ['rgb(252, 177, 3)', 'rgb(252, 57, 3)', 'rgb(73, 179, 59)', 'rgb(58, 158, 141)', 
        'rgb(49, 66, 143)', 'rgb(89, 40, 12)'];
        let color = colors[utility.genRandNum(0, colors.length-1)];
        $(".quote-box").css({"background-color": color});
    }
});
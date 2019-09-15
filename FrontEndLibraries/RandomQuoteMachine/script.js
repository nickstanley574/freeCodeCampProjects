const projectName = "random-quote-machine";
var tweetEndpoint = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="

function getQuote() {
    $.getJSON('data.json', function(json) {
        randomQuote = json.quotes[Math.floor(Math.random() * json.quotes.length)];
        quote = randomQuote.quote;
        author = randomQuote.author;
        $('#text').text(quote);
        $('#author').text(author);
        $('#tweet-quote').attr('href', tweetEndpoint + encodeURIComponent('"' + quote + '" --' + author));
    });
}

$(document).ready(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
});


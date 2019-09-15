const projectName = "random-quote-machine";
var currentQuote = 'Hammer Hammer Hammer', currentAuthor = 'John Henry';



function getQuote() {
    console.log('getQuote()');
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

    $.getJSON('data.json', function(json) {
        randomQuote = json.quotes[Math.floor(Math.random() * json.quotes.length)];
        quote = randomQuote.quote;
        author = randomQuote.author;
        $('#text').text(quote);
        $('#author').text(author);
    });
}



$(document).ready(function() {
    console.log('$(document).ready(function()');
    $('#text').text(currentQuote);
    $('#author').text(currentAuthor);

    $('#new-quote').on('click', getQuote);

    $('#tweet-quote').on('click', function() {
        openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      });
});


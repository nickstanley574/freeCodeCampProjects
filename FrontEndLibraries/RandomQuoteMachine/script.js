const projectName = "random-quote-machine";
var tweetEndpoint = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="

function getQuote() {

    const rollSound = new Audio("janet_goodplace_boop.mp3");
    rollSound.play();

    $.getJSON('data.json', function(json) {
        randomQuote = json.quotes[Math.floor(Math.random() * json.quotes.length)];
        quote = randomQuote.quote;
        author = randomQuote.author;
        // $('#text').text(quote);
        // $('#author').text(author);
        $('#tweet-quote').attr('href', tweetEndpoint + encodeURIComponent('"' + quote + '" --' + author));
    });


    $(".quote").animate(
        { opacity: 0 },
        500,
        function() {
          $(this).animate({ opacity: 1}, 500);
          $('#text').text("\"" + randomQuote.quote + "\"");
        }
      );

      $(".quote-author").animate(
        { opacity: 0 },
        500,
        function() {
          $(this).animate({ opacity: 1}, 500);
          $('#author').text("-- " + randomQuote.author);
        }
      );
}

$(document).ready(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
});


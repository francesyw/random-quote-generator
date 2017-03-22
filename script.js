const API_URL = "http://api.forismatic.com/api/1.0/";
var launch = true;
var articleHeight;

$( document ).ready( readyFn );

function readyFn(jQuery) {
	getQuote();
	$(".new-btn i").on("click", getQuote);
};

// Get random quotes from api
function getQuote() {
	var jqxhr = $.ajax({
		url: API_URL,
		dataType: "jsonp",
		jsonp: false,
		jsonpCallback: "callback",
		data: {
			method: "getQuote",
			format: "jsonp",
			lang: "en",
			jsonp: "callback"
		}
	})
		.done(function(data) {
			// console.log(JSON.stringify(data));
			var $quote = data.quoteText;
			var $author = data.quoteAuthor;
			$(".quote-text").text($quote);
			$(".quote-author").text("- " + $author);
			$(".quote-body").hide().fadeIn(1500);

			borderAnimation();
		})
};

// Animate the height of article
function borderAnimation() {
	var $newArticleHeight = $(".quote-body").height();
	if (launch) {
		articleHeight = $("article").height();
		launch = false;
	} else {
		$("article").css("height", articleHeight);
		$("article").animate({
			"height": $newArticleHeight
		}, 900, function() {
			$("article").css("height", "auto");
		});
	}
	articleHeight = $newArticleHeight;
}
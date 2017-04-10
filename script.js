const API_URL = "http://api.forismatic.com/api/1.0/";
var launch = true;
var articleHeight;

$( document ).ready( readyFn );

function readyFn(jQuery) {
	getQuote();
	$(".new-btn i").on("click", getQuote);
	socialShare();
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

// Social share links
function socialShare() {
	href='';
	$(".social-links a").on("click", function() {
		switch ($(this).attr('id')) {
			case 'facebook':
				href='https://www.facebook.com/sharer/sharer.php?u=http%3A//francesyw.com/thought-for-the-day/'
				break;
			case 'twitter':
				href='https://twitter.com/home?status=Thought%20for%20the%20day%20-%0A%20http%3A//francesyw.com/thought-for-the-day/'
				break;
			case 'tumblr':
				href='http://www.tumblr.com/share/link?url=http%3A%2F%2Ffrancesyw.com%2Fthought-for-the-day%2F&name=Thought%20for%20the%20day'
				break;
			case 'linkedin':
				href='https://www.linkedin.com/shareArticle?mini=true&url=http%3A//francesyw.com/thought-for-the-day/&title=Thought%20for%20the%20day&summary=&source='
				break;
		}
		window.open(href, 'share', 'width=600, height=400');
		return false;
	});
}
$( document ).ready( readyFn );

function readyFn(jQuery) {

	const API_URL = "http://api.forismatic.com/api/1.0/";

	$("#getQuote").on("click", function(){

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
				console.log(JSON.stringify(data));
				var $quote = data.quoteText;
				var $author = data.quoteAuthor;
				$("#quote").text($quote);
				$("#author").text($author);
			})
	});
};


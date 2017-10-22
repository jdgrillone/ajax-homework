var animalsArray = ["Cat"];

function populateButtons() {
	$("#buttons").empty();

	for (var i = 0; i < animalsArray.length; i++) {
		var a = $("<button>");
		a.attr("id", "animal-button");
		a.addClass("gif");
		a.attr("data", animalsArray[i]);
		a.text(animalsArray[i]);
		$("#buttons").append(a);
	}



}

$("#addAnimal").on("click", function(event) {
	event.preventDefault();
        // This line of code will grab the input from the textbox
        var newAnimal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animalsArray.push(newAnimal);

        // Calling renderButtons which handles the processing of our movie array
        populateButtons();
    });

populateButtons();

$("#animal-button").on("click", function() {
	var tag = $(this).attr("data");
	var api_key = "GDJCSZq270XjzfIi3snv7ZQjQZDXWUi9";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=" + api_key + "&limit=1";


	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		console.log(response);

		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div>");

			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);

			var image = $("<img>");
			var imageUrl = results[0].images.fixed_height.url;
			image.attr("src", imageUrl);
			image.attr("alt", "cat image");
			gifDiv.prepend(p);
			gifDiv.prepend(image);
			$("#images").prepend(gifDiv);
		}
	});


});

$(document).on("click", ".gif", displayMovieInfo);
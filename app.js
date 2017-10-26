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
// Click handler for Submit button
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

//click handler for buttons
$(document).on("click", "#animal-button", function() {
	var tag = $(this).attr("data");
	var api_key = "GDJCSZq270XjzfIi3snv7ZQjQZDXWUi9";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=" + api_key + "&limit=10";


	
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
			var animatedUrl = results[i].images.fixed_height.url;
			var stillUrl = results[i].images.fixed_height_still.url;
			image.attr("src", stillUrl);
			image.attr("data-still", stillUrl)
			image.attr("alt", "gif");
			image.addClass("gifImage");
			image.attr("data-animated", animatedUrl);
			image.attr("data-state", "still");
			gifDiv.prepend(p);
			gifDiv.prepend(image);
			$("#images").prepend(gifDiv);
		}
	});


});


////NOT DONE
$(document).on("click", ".gifImage", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("data-state", "animated");
		$(this).attr("src", $(this).attr("data-animated"));
	} else {
		$(this).attr("data-state", "still");
		$(this).attr("src", $(this).attr("data-still"))
	}
});
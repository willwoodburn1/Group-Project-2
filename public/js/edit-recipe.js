$(document).ready(function () {
    // variables
    const title = $(".title");
	const imageLink = $(".image-link");
	
    const ingredient = $(".ingredient");
    // const ingredientId = $("");
    const quantity = $(".quantity");
	const measure = $(".measure");
	const name = $(".name")
	const price = $(".price");
	
	const method = $(".method");

	

	// on click add to edit name
	const editValue = function(event) {
		console.log(event)
		const element = $(`.${event.currentTarget.className}`);
		console.log(element)

		$(`.${element}`).append(`<input type="text">${$(`.${element}`).text()}`)
		
	}

	title.on("click", editValue)
	imageLink.on("click", editValue)
	quantity.on("click", editValue)
	measure.on("click", editValue)
	name.on("click", editValue)
	price.on("click", editValue)
	method.on("click", editValue)
    // take edit input and update on submit
	

	// $(".update-form").on("submit", function (event) {
	// 	// Make sure to preventDefault on a submit event.
	// 	event.preventDefault();

	// 	var updatedQuote = {
	// 		author: $("#auth").val().trim(),
	// 		quote: $("#quo").val().trim(),
	// 	};

	// 	var id = $(this).data("id");

	// 	// Send the POST request.
	// 	$.ajax("/api/quotes/" + id, {
	// 		type: "PUT",
	// 		data: updatedQuote,
	// 	}).then(function () {
	// 		console.log("updated quote");
	// 		// Reload the page to get the updated list
	// 		location.assign("/members");
	// 	});
	// });
});

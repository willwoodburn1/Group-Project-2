// Create Recipe Form code goes here
$(document).ready(function () {
	let Title = title;
	let image;
	let author;

	let recipe = {

	}

	// add recipe name
	$("#add-recipe-name").on("click", function (event) {
		event.preventDefault();
		$(".title").text($("#recipe-name").val().trim());
		title = $("#recipe-name").val().trim();
	});

	// add image link
	$("#add-recipe-image").on("click", function (event) {
		event.preventDefault();
		$("img").attr("src", $("#recipe-image").val().trim());
		image = $("#recipe-image").val().trim()
	});

	// get chef name
	$.get("/api/user_data").then(function (data) {
		if (data.username) {
			$(".author").text(data.username);
			author = data.username;
		}
	});

	// search for ingredients in db
	$("#ingredient-search").on("click", function (event) {
		event.preventDefault();
		let search = $("#recipe-item").val().trim().toLowerCase();

		// console.log($(".search-item")[0].children("p"));
		// for (let i = 0; i < $(".search-item").length; i++) {

		// 	let item = $(".search-item")[i];

		// 	if (item) {

		// 		let txtValue = item.textContent || item.innerText;

		// 		if (txtValue.toLowerCase() = search) {
		// 			$(".search-item")[i].style.display = "";
		// 		} else {
		// 			$(".search-item")[i].style.display = "none";
		// 		}
		// 	}
		// }

		// for (let i = 0; i < tr.length; i++) {
		// 	td = tr[i].getElementsByTagName("td")[0];
		// 	if (td) {
		// 		txtValue = td.textContent || td.innerText;
		// 		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		// 			tr[i].style.display = "";
		// 		} else {
		// 			tr[i].style.display = "none";
		// 		}
		// 	}
		// }

		$.get("/api/ingredients/" + search).then(function (data) {
			location.replace("/create-recipe/" + search);
			$(".title").text(title)
		});
	});

	// get single ingredient

	// if less than 20 results, 20-amount
	// api call for 20-amount
});

// create-recipe.handlebars should contain
// Title
// Ingredients List
// Input box to search for ingredients
// Submit ingredient button to initiate search for ingredients
// For each ingredient 2 more input boxes should be created, 1 for measure (selection dropbox of the different measure types) and 1 for quantity
// Method Textarea
// Add Images Option
// Final submit recipe button

// Title

// Ingredients List
// Search box to input ingredient
// Users enter ingredient name into the search box
// Submit button
// User clicks the submit button

// Check local database if ingredient already exists
// If exists then add to ingredients list
// If not then make the API call
//
// API Call
// If ingredient is found
// Get price and add to ingredients list
// If not found
// Ask user to input ingredient manually with price and category (category optional)

// Household ingredients
// If ingredient is household (salt, herbs, spices, etc...)
// No need for price
// Everything else needs a price

// Method
// Textarea

// Images
// How to add images to the database?

// Submit the recipe
//
// To go into the ingredients database
// Name
// Price
// Category?
//
// To go into the recipe database
// Title
// Method
// Images
//
// To go into the measures database if measure does not exist
// Measure name
//
// RecipeIngredients Database
// for every ingredient
// insert chef_id, recipe_id, ingredient_id, measure_id, quantity

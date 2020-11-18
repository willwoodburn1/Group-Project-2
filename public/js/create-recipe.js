// Create Recipe Form code goes here
$(document).ready(function () {
	let recipe = {
		recipe_id: "",
		author_id: "",
		title: $(".title").text(),
		image: $(".image").attr("src", "https://picsum.photos/250/150"),
		author: $(".author").text(),
		ingredients: [],
		method: "",
	};

	// add recipe name
	$("#add-recipe-name").on("click", function (event) {
		event.preventDefault();
		$(".title").text($("#recipe-name").val().trim());
		recipe.title = $("#recipe-name").val().trim();
	});

	// add image link
	$("#add-recipe-image").on("click", function (event) {
		event.preventDefault();
		$("img").attr("src", $("#recipe-image").val().trim());
		recipe.image = $(".image").attr("src");
	});

	// get chef name
	$.get("/api/user_data").then(function (data) {
		if (data.username) {
			$(".author").text(data.username);
			recipe.author = data.username;
			recipe.author_id = data.id;
		}
	});

	// search for ingredients in db
	$("#not-found").hide();
	$("#ingredient-search").on("click", function (event) {
		event.preventDefault();
		let search = $("#recipe-item").val().trim().toUpperCase();
		let items = $(".search-item");
		let count = 1;

		for (var item of items) {
			let result = item.getElementsByClassName("results-name")[0];
			let resultText = result.textContent || result.innerText;

			if (resultText.toUpperCase().indexOf(search) > -1) {
				item.style.display = "";
				count -= 1;
			} else {
				item.style.display = "none";
			}
		}
		if (count >= 0) {
			$("#not-found").show();
		} else {
			$("#not-found").hide();
		}
	});

	// add single ingredient id, name, price to display
	$(".search-item").on("click", function (event) {
		event.preventDefault();

		let id = event.currentTarget.children[0].id;
		let name = event.currentTarget.children[1].id;
		let price = event.currentTarget.children[2].id;

		$("#ingredient-id").text(id);
		$("#ingredient-name").text(name);
		$("#ingredient-price").text(price);

		// todo: hide display table and add button until clicked on search item
	});

	// add single ingredient to list
	$("#add-ingredient").on("click", function (event) {
		event.preventDefault();
		let quantity = $("#ingredient-quantity").val().trim();
		let measure = $("#ingredient-measures").val();

		let ingredient = {
			id: $("#ingredient-id").text(),
			quantity: quantity,
			measure: measure,
			name: $("#ingredient-name").text(),
			price: $("#ingredient-price").text(),
		};

		if (quantity && measure) {
			$(".ingredients").append(
				`<tr>
					<td class="quantity">${ingredient.quantity}</td>
					<td class="measure">${ingredient.measure}</td>
					<td class="name">${ingredient.name}</td>
					<td>$<span class="price">${ingredient.price}</span></td>
				</tr>`
			);
			recipe.ingredients.push(ingredient);
			console.log(recipe);
		}
	});

	// show add manual ingredient if not in db
	// toggle display auto to manual fill ingredient
	$("#manual-fill").hide();
	$(".toggle-manually").on("click", function (event) {
		event.preventDefault();

		$("#manual-fill").toggle();
		$("#auto-fill").toggle();
	});

	// add single ingredient manually (post & get)
	$("#add-manual").on("click", function (event) {
		event.preventDefault();

		let ingredient = {
			id: "ingredient not posted",
			quantity: $("#manual-quantity").val().trim(),
			measure: $("#manual-measures").val(),
			name: $("#manual-name").val().trim(),
			price: $("#manual-price").val().trim(),
		};

		if (ingredient.quantity && ingredient.name && ingredient.price) {
			$(".ingredients").append(
				`<tr>
					<td class="quantity">${ingredient.quantity}</td>
					<td class="measure">${ingredient.measure}</td>
					<td class="name">${ingredient.name}</td>
					<td>$<span class="price">${ingredient.price}</span></td>
				</tr>`
			);

			// post new ingredient
			$.post("/api/ingredients", {
				item: ingredient.name,
				price: ingredient.price,
			}).done(function () {
				// get ingredient id
				$.get(`/api/ingredients/${ingredient.name}/${ingredient.price}`)
					.then(function (data) {
						ingredient.id = `${data.id}`;
					})
					.done(function () {
						// push to ingredients list
						recipe.ingredients.push(ingredient);
						console.log(recipe);
						$("#manual-quantity").val("");
						$("#manual-name").val("");
						$("#manual-price").val("");
					});
			});
		}
	});

	// add method step
	$("#add-method-step").on("click", function (event) {
		event.preventDefault();

		// append method to preview
		let step = $("#recipe-method").val().trim();

		if (step) {
			$(".method").append(`<li>${step}</li>`);

			recipe.method += `<li>${step}</li>`;
			$("#recipe-method").val("");
			console.log(recipe);
		}
	});

	// submit recipe
	$("#submit-recipe").on("click", function () {
		$.post("/api/recipes", {
			title: recipe.title,
			method: recipe.method,
			UserId: recipe.author_id,
			// to add image-link to model
		}).done(function () {
			$.get(`/api/recipes/${recipe.title}/${recipe.author_id}`).then(
				function (data) {
					recipe.recipe_id = data.id;

					// todo: post to recipe_ingredients for every ingredient
					recipe.ingredients.forEach((element) => {
						// console.log(element.id)
						$.post("/api/recipesIngredients", {
							recipe_id: recipe.recipe_id,
							ingredient_id: element.id,
						});
					});
				}
			);
		});
	});
});

// Images
// How to add images to the database?

// Submit the recipe
//
// RecipeIngredients Database
// for every ingredient
// insert chef_id, recipe_id, ingredient_id, quantity

$(document).ready(function () {
	let recipe = {
		title: "",
		method: "",
		image: "",
		ingredients: [],
	};
	let updatedIngredients = [];

	$(document).on("click", ".field", editValue);
	$(document).on("keyup", ".field", finishEdit);
	$(document).on("click", "#submit-update", submit);

	getRecipeInfo();

	function submit() {
		let recipe_id = window.location.pathname.replace("/edit-recipe/", "");
		$.ajax({
			method: "PUT",
			url: `/api/recipes/${recipe_id}`,
			data: {
				title: $(".title").text(),
				method: $(".method").text(),
				image: $(".image").text(),
			},
		}).done(function () {
			console.log("RECIPE SUCCESS");
		});

		pushIngredients();

		for (var item of updatedIngredients) {
			$.ajax({
				method: "PUT",
				url: `/api/recipesIngredients/${recipe_id}`,
				data: {
					quantity: item.quantity,
					ingredient_id: item.id,
					measure_id: item.measure_id
				}
			}).done(function() {
				console.log("RECIPEINGREDIENT SUCCESS");
			})
			console.log(item);
		}
	}

	async function pushIngredients() {
		for (var item of $(".ingredients")) {
			let ingredient = {
				id: $(item)[0].children[0].innerText,
				quantity: $(item)[0].children[1].innerText,
				measure: $(item)[0].children[2].innerText,
				name: $(item)[0].children[3].innerText,
				price: $(item)[0].children[4].innerText,
			};

			await $.get(`/api/measures/${ingredient.measure}`, function (data) {
				ingredient.measure_id = data.id;
			});

			await $.get(
				`/api/ingredients/item/${ingredient.name}`,
				function (data) {
					if (data === null) {
						$.post("/api/ingredients", {
							item: ingredient.name,
							price: ingredient.price,
						}).done(function () {
							console.log("posted new ingredient");
							$.get(
								`/api/ingredients/item/${ingredient.name}`,
								function (data) {
									ingredient.id = data.id;
									ingredient.name = data.item;
									ingredient.price = data.price;
								}
							);
						});
					} else {
						return;
					}
				}
			);
			
			updatedIngredients.push(ingredient);
			console.log(updatedIngredients)
		}
	}

	// gets current value and shows input box
	function editValue() {
		console.log(this);

		let currentText = $(this).children("span").text();
		$(this).children().hide();
		$(this).children("input.edit").val(currentText);
		$(this).children("input.edit").show();
		$(this).children("input.edit").focus();
	}

	// changes input box value to current value
	function finishEdit(event) {
		// key pressed 13 = enter
		if (event.which === 13) {
			var inputText = $(this).children("input").val().trim();
			$(this).children("span")[0].textContent = inputText;

			$(this).children().hide();
			$(this).children("span").show();
		}
	}

	async function getRecipeInfo() {
		let id = window.location.pathname.replace("/edit-recipe/", "");
		await $.get(`/api/recipes/${id}`, function (data) {
			recipe.title = data.title;
			recipe.method = data.method;
			recipe.image = data.image;
		});
		await $.get(`/api/recipesIngredients/${id}`, function (data) {
			for (var item of data) {
				let ingredient = {
					id: item.ingredient_id,
					measure_id: item.measure_id,
					quantity: item.quantity,
				};

				// ingredient - name, price
				$.get(`/api/ingredients/${ingredient.id}`, function (data) {
					ingredient.name = data.item;
					ingredient.price = data.price;
				});
				// measure - name
				$.get(
					`/api/measures/id/${ingredient.measure_id}`,
					function (data) {
						ingredient.measure = data.measure_metric;
					}
				);
				recipe.ingredients.push(ingredient);
			}
		});
	}
});

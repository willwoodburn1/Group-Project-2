$(document).ready(function () {
	

	$(".delete-recipe").on("click", (event) => {
		event.preventDefault();
		let recipe_id = event.currentTarget.id;

		$.ajax("/api/recipes/" + recipe_id, {
			type: "DELETE",
		}).then(function () {
			console.log("deleted recipe with id:", recipe_id);
			location.reload();
		});
	});
});

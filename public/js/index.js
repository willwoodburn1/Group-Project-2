$(document).ready(function() {

    let searchList = $("#search-list");

    let budgetForm = $("#budget-form");
    let budgetInput = $("#budget-input");

    budgetForm.on("submit", function(event) {
        event.preventDefault();
        let inputData = {
            budget: budgetInput.val().trim()
        }

        if (!inputData.budget) {
            return;
        }

        findRecipes(inputData.budget);
        budgetInput.val("");
    })

    function findRecipes(budget) {
        $.get(`/api/recipes/less-than/${budget}`, renderSearchResults);
    }

    function renderSearchResults(data) {
        console.log(data)
        if (data.length === 0) {
            searchList.html(`
                <p>There are no recipes cheaper than this<p/>
            `);
        } else {
            searchList.html("");
            data.forEach(recipe => {
                console.log(recipe);
                let recipeItem = $("<li>");
                recipeItem.html(`
                    <div>
                        <h1>${recipe.title}</h1>
                        <a href="/view-recipe/${recipe.id}">View Recipe</a>
                        <img src="https://picsum.photos/250/150" alt="placeholder-image">
                    </div>
                `);
                console.log(recipeItem);
                searchList.append(recipeItem);
            })
        }
    }

})

// How much would you like to spend?
// Select or enter amount in dollars
// Bring up recipes that cost that much to make or less
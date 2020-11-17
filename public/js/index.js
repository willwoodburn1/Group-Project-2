$(document).ready(function() {

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
        $.get(`/api/recipes/less-than/:${budget}`, function(data) {
            console.log(budget);
            console.log(data);
        })
    }

})

// How much would you like to spend?
// Select or enter amount in dollars
// Bring up recipes that cost that much to make or less
const Recipe = require("../../models/recipe.model")

//
const favButtons = document.querySelectorAll(".favbutton")

window.addEventListener('load', () => {
    favButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.getRecipeInformationById(recipeId) 
            .then(recipeInfo => RecipeAPIHandler.addToFavourites(recipeInfo))
            .catch(err => "There was an error accessing the API", err)
        
        //REFACTOR
    }))
})
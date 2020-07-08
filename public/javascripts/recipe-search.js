//Selectors
const favButtons = document.querySelectorAll(".favbutton")
const searchRecipesBtn = (".search-form-api")

//Event listeners
window.addEventListener('load', () => {
    favButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.getRecipeInformationById(recipeId)
            .then(recipeInfo => {
                RecipeAPIHandler.addToFavourites(recipeInfo, recipeId)
                button.classList.add("added")
            })
            .catch(err => {
                throw new Error(err)})
    }))
})
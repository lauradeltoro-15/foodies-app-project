//Selectors
const favButtons = document.querySelectorAll(".favbutton")

window.addEventListener('load', () => {
    favButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.getRecipeInformationById(recipeId)
            .then(recipeInfo => {
                RecipeAPIHandler.addToFavourites(recipeInfo, recipeId)
                button.classList.add("added")
            })
            .catch(err => console.log("There was an error accessing the API", err))
    }))
    
})
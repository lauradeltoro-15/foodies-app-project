const favButtons = document.querySelectorAll(".favbutton")

window.addEventListener('load', () => {
    favButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.getRecipeInformationById(recipeId)
            .then(recipeInfo => {
                console.log(recipeInfo)
                RecipeAPIHandler.addToFavourites(recipeInfo, recipeId)
            })
            .catch(err => console.log("There was an error accessing the API", err))
        button.classList.add(".added")
    }))
})
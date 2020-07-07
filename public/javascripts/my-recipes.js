const removeButtons = document.querySelectorAll(".remove-recipe-btn")
const addToWeekBtn = document.querySelectorAll(".add-to-week-btn")

window.addEventListener('load', () => {
    removeButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.deleteRecipe(recipeId)
            .then(() => {
                const cardToRemove = document.querySelector(`[data-recipe='${recipeId}']`)
                cardToRemove.remove()
            })
            .catch(err => console.log("There was an error accessing the API", err))
    }))
    removeButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.deleteRecipe(recipeId)
            .then(() => {
                const cardToRemove = document.querySelector(`[data-recipe='${recipeId}']`)
                cardToRemove.remove()
            })
            .catch(err => console.log("There was an error accessing the API", err))
    }))
})

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
    addToWeekBtn.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        console.log("Wiiii")
        const recipeId = button.getAttribute("data-recipe")
        const inputDate = document.querySelector(`.weekdate[data-recipe="${recipeId}"]`)
        RecipeAPIHandler.addRecipeToWeek(recipeId, inputDate.value)
        inputDate.remove()
        button.remove()
        const finalDate = document.createElement("div")
        const parent = document.querySelector(`.card-body[data-recipe="${recipeId}"]`)
        console.log(parent)
        parent.appendChild(finalDate)
        finalDate.setAttribute("class", "added")
        finalDate.innerText = `${inputDate.value}`

    }))
})
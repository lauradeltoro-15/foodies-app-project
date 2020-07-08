//Selectors
const removeButtons = document.querySelectorAll(".remove-recipe-btn")
const addToWeekBtn = document.querySelectorAll(".add-to-week-btn")

// Helpers 
const createBackValue = (recipeId, dateValue) => {
    const finalDate = document.createElement("div")
    const parent = document.querySelector(`.card-body[data-recipe="${recipeId}"]`)
    parent.appendChild(finalDate)
    finalDate.style.color = "#942a2a"
    finalDate.innerText = `Added to your weekmeal: ${dateValue}`
}

//Event listeners
window.addEventListener('load', () => {
    removeButtons.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        RecipeAPIHandler.deleteRecipe(recipeId)
            .then(() => {
                const cardToRemove = document.querySelector(`[data-recipe='${recipeId}']`)
                cardToRemove.remove()
            })
            .catch(err => {
                throw new Error(err)})
    }))
    addToWeekBtn.forEach(button => button.addEventListener("click", e => {
        e.preventDefault()
        const recipeId = button.getAttribute("data-recipe")
        const inputDate = document.querySelector(`.weekdate[data-recipe="${recipeId}"]`)
        RecipeAPIHandler.addRecipeToWeek(recipeId, inputDate.value)
        inputDate.remove()
        button.remove()
        createBackValue(recipeId, inputDate.value)
    }))
})
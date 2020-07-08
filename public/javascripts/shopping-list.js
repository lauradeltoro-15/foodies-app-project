const deleteIngredientButton = document.querySelectorAll(".delete-item-button")

window.addEventListener('load', () => {
    deleteIngredientButton.forEach(btn =>
        btn.addEventListener("click", e => {
            const ingredientContainer = btn.closest(".list-ingredient-container")
            const ingredientName = ingredientContainer.children[1].innerHTML
            RecipeAPIHandler.deleteIngredientFromShoppingList(ingredientName)
            ingredientContainer.remove()
        })
    )
})
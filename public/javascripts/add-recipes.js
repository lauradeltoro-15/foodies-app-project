//Selectors
const addIngredientButton = document.querySelector(".add-ingredient")
const uniqueIngredientContainer = document.querySelector(".unique-ingredient-container")
const IngredientsContainer = document.querySelector(".ingredients-container")
const stepsContainer = document.querySelector(".steps-container")

//Helper functions
// const createElm = (elm, textToUpdate,className) => {
//     const elem = document.createElement(elm);
//     elem.setAttribute("class", className)
//     elem.innerHTML = textToUpdate
//     return elem;
//   }
window.addEventListener('load', () => {
    addIngredientButton.addEventListener("click", () => IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true)))
    addIngredientButton.addEventListener("click", () => IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true)))
})
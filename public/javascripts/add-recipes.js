//Selectors
const addIngredientButton = document.querySelector(".add-ingredient")
const addStepButton = document.querySelector(".add-step")
const uniqueIngredientContainer = document.querySelector(".unique-ingredient-container")
const IngredientsContainer = document.querySelector(".ingredients-container")
const stepsContainer = document.querySelector(".steps-container")
const uniqueStepContainer = document.querySelector(".unique-steps-container")

//Helper functions
// const createElm = (elm, textToUpdate,className) => {
//     const elem = document.createElement(elm);
//     elem.setAttribute("class", className)
//     elem.innerHTML = textToUpdate
//     return elem;
//   }
window.addEventListener('load', () => {
    addIngredientButton.addEventListener("click", () => {
        
        IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true))
    })
    addIngredientButton.addEventListener("click", () => IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true)))
    addStepButton.addEventListener("click", () => stepsContainer.appendChild(uniqueStepContainer.cloneNode(true)))
})
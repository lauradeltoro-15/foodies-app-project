//Selectors
const addIngredientButton = document.querySelector(".add-ingredient")
const addStepButton = document.querySelector(".add-step")
const uniqueIngredientContainer = document.querySelector(".unique-ingredient-container")
const newAmountADD = document.querySelector("#amountADD")
const newIngredientADD = document.querySelector('#ingredientADD')
const IngredientsContainer = document.querySelector(".ingredients-container")
const stepsContainer = document.querySelector(".steps-container")
const uniqueStepContainer = document.querySelector(".unique-steps-container")

//Helper functions
const createElm = (elm, parent, attributeNames, attributeValues) => {
    const newElem = document.createElement(elm);
    parent.appendChild(newElem)
    attributeNames.forEach((attribute, i) => newElem.setAttribute(attribute, attributeValues[i]))
}

//Event listeners
window.addEventListener('load', () => {
    addIngredientButton.addEventListener("click", () => {
        createElm('input', newAmountADD, ['name', 'type', 'class'], ['amount', 'text', 'form-control separated-input'])
        createElm('input', newIngredientADD, ['name', 'type', 'class'], ['ingredients', 'text', 'form-control separated-input'])
    })
    addStepButton.addEventListener("click", () => {
        createElm('input', uniqueStepContainer, ['name', 'type', 'class'], ['steps', 'text', 'form-control separated-input'])
    })
})
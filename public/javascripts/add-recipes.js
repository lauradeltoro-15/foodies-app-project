//Selectors
const addIngredientButton = document.querySelector(".add-ingredient")
const addStepButton = document.querySelector(".add-step")
const uniqueIngredientContainer = document.querySelector(".unique-ingredient-container")
const newAmountADD = document.querySelector("#amountADD")
const newIngredientADD= document.querySelector('#ingredientADD')
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
    //esto se podria meter en una funcion en un archivo a parte y llamarla desde aqui
    addIngredientButton.addEventListener("click", () => {
        const newAmount = document.createElement("div")
        newAmountADD.appendChild(newAmount)
        newAmount.setAttribute("id", 'amountADD')
        const newInput = document.createElement('input')
        newAmount.appendChild(newInput)
        newInput.setAttribute('name', 'amount')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('class', 'form-control')
        newInput.setAttribute('id', 'amount')

        const newIngredient = document.createElement('div')
        newIngredientADD.appendChild(newIngredient)
        newIngredient.setAttribute('id', 'ingredientADD')
        const newInputIngredient = document.createElement('input')
        newIngredient.appendChild(newInputIngredient)
        newInputIngredient.setAttribute('name', 'amount')
        newInputIngredient.setAttribute('type', 'text')
        newInputIngredient.setAttribute('class', 'form-control')
        newInputIngredient.setAttribute('id', 'amount')


        


        

        
        //IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true))
    })
    //addIngredientButton.addEventListener("click", () => IngredientsContainer.appendChild(uniqueIngredientContainer.cloneNode(true)))
    addStepButton.addEventListener("click", () => {
        const newStep = document.createElement('input')
        uniqueStepContainer.appendChild(newStep)
        newStep.setAttribute('name', 'steps')
        newStep.setAttribute('type', 'text')
        newStep.setAttribute('class', 'form-control')
        newStep.setAttribute('id', 'step')
        //stepsContainer.appendChild(uniqueStepContainer.cloneNode(true))
    })
})
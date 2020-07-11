//Selectors
const addIngredientButton = document.querySelector(".add-ingredient")
const addStepButton = document.querySelector(".add-step")
const uniqueIngredientContainer = document.querySelector(".unique-ingredient-container")
const newAmountADD = document.querySelector("#amountADD")
const newIngredientADD = document.querySelector('#ingredientADD')
const IngredientsContainer = document.querySelector(".ingredients-container")
const stepsContainer = document.querySelector(".steps-container")
const uniqueStepContainer = document.querySelector(".unique-steps-container")
const guessNutritionBtn = document.querySelector(".guess-nutrition-btn")
const titleInput = document.querySelector("[name=title]")
const caloriesInput = document.querySelector("[name=calories]")
const proteinsInput = document.querySelector("[name=proteins]")
const fatInput = document.querySelector("[name=fat]")
const carbohydratesInput = document.querySelector("[name=carbohydrates]")
const nutritionContainer = document.querySelector(".col-md-12.nutritions-container")
const errorMsg = document.createElement("p")

//Helper functions
const createElm = (elm, parent, attributeNames, attributeValues) => {
    const newElem = document.createElement(elm);
    parent.appendChild(newElem)
    attributeNames.forEach((attribute, i) => newElem.setAttribute(attribute, attributeValues[i]))
}
const getAverageNutritionValue = (nutritionGuess, nutritionType) => ((nutritionGuess[nutritionType].confidenceRange95Percent.max + nutritionGuess[nutritionType].confidenceRange95Percent.min) / 2).toFixed(2)
const obtainNutritionValues = (nutritionGuess) => {
    return {
        calories: getAverageNutritionValue(nutritionGuess, "calories"),
        carbohydrates: getAverageNutritionValue(nutritionGuess, "carbs"),
        fats: getAverageNutritionValue(nutritionGuess, "fat"),
        proteins: getAverageNutritionValue(nutritionGuess, "protein")
    }
}
const renderNutritionValues = (nutritionValues) => {
    caloriesInput.value = nutritionValues.calories
    fatInput.value = nutritionValues.fats
    proteinsInput.value = nutritionValues.proteins
    carbohydratesInput.value = nutritionValues.carbohydrates
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
    guessNutritionBtn.addEventListener("click", e => {
        if (titleInput.value) {
            RecipeAPIHandler.guessNutritionValues(titleInput.value)
                .then(nutritionGuess => obtainNutritionValues(nutritionGuess))
                .then(nutritionValues => {
                    renderNutritionValues(nutritionValues)
                    errorMsg ? errorMsg.remove() : null
                })
                .catch(err => {
                    throw new Error(err)
                })
        } else {
            errorMsg.setAttribute("class", "errorMessage")
            errorMsg.innerText = "We need a title for make a guess!"
            errorMsg.style.color = "red"
            nutritionContainer.appendChild(errorMsg)
        }


    })
})
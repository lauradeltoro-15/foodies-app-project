//Selectors
const ingredientBtn = document.querySelector(".add-ingredient-to-search")
const inputContainer = document.querySelector(".search-group-cont")

//Helper Fuctions
const createElm = (elm, parent, attributeNames, attributeValues) => {
    const newElem = document.createElement(elm);
    parent.appendChild(newElem)
    attributeNames.forEach((attribute, i) => newElem.setAttribute(attribute, attributeValues[i]))
}

//Event listeners
window.addEventListener('load', () => {

    ingredientBtn.addEventListener("click", () => {
        createElm("input", inputContainer, ["type", "class", "name"], ["text", "form-control search-control search-control-small", "ingredients"])
    })

})

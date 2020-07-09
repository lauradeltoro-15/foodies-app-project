const ingredientBtn = document.querySelector(".add-ingredient-to-search")
const inputContainer = document.querySelector(".search-group-cont")

const createElm = (elm, parent, attributeNames, attributeValues) => {
    const newElem = document.createElement(elm);
    parent.appendChild(newElem)
    attributeNames.forEach((attribute, i) => newElem.setAttribute(attribute, attributeValues[i]))
}

ingredientBtn.addEventListener("click", () => {
    createElm("input", inputContainer, ["type", "class"], ["text", "form-control search-control search-control-small"])
})
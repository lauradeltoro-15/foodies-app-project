//Selectors
const dragContainers = document.querySelectorAll(".dragabbles-container")
const draggableCards = document.querySelectorAll(".draggable-item")
const deleteButtons = document.querySelectorAll(".delete-meal")
const saveChangesBtn = document.querySelector(".main-btn-save-changes")

//Helpers
let weekmealsChanged = []
let draggedItem = null
let draggedItemId = null
const gettingUniqueChanges = () => {
    const ids = weekmealsChanged.map(elm => elm.dataMealVal)
    return weekmealsChanged.filter((elm, i) => ids.indexOf(elm.dataMealVal) === i)
}

//Event listeners
window.addEventListener('load', () => {

    deleteButtons.forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault()
            const idContainer = button.closest("[data-meal]")
            const idValue = idContainer.getAttribute("data-meal")
            RecipeAPIHandler.deleteMealFromWeek(idValue)
                .then(() => idContainer.remove())
                .catch(err => {
                    throw new Error(err)
                })

        })
    })

    draggableCards.forEach(card => {
        card.addEventListener("dragstart", () => {
            draggedItem = card
            draggedItemId = card.getAttribute("data-meal")
            setTimeout(() => card.style.display = "none", 0)
        })
        card.addEventListener("dragend", () => {
            setTimeout(() => {
                draggedItem.style.display = "block"
                draggedItem = null
                draggedItemId = null
            }, 0)
        })
    })

    dragContainers.forEach(container => {
        container.addEventListener("dragover", e => e.preventDefault())
        container.addEventListener("dragenter", e => e.preventDefault())
        container.addEventListener("drop", e => {
            container.appendChild(draggedItem)
            const newDateVal = container.getAttribute("data-date")
            weekmealsChanged.unshift({
                dataMealVal: draggedItemId,
                newDateVal
            })

        })
    })

    saveChangesBtn.addEventListener("click", () => {
        RecipeAPIHandler.changeMealDate(gettingUniqueChanges())
    })

})
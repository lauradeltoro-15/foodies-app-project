const dragContainers = document.querySelectorAll(".dragabbles-container")
const draggableCards = document.querySelectorAll(".draggable-item")
const deleteButtons = document.querySelectorAll(".delete-meal")
let draggedItem = null

window.addEventListener('load', () => {
    deleteButtons.forEach(button => {
        button.addEventListener("click", e => {
            const idContainer = button.closest("[data-meal]")
            const idValue = idContainer.getAttribute("data-meal")
            RecipeAPIHandler.deleteMealFromWeek(idValue)
        })
    })
    draggableCards.forEach(card => {
        card.addEventListener("dragstart", () => {
            console.log("drag started")
            draggedItem = card
            setTimeout(() => card.style.display = "none", 0)
        })
        card.addEventListener("dragend", () => {
            setTimeout(() => {
                draggedItem.style.display = "block"
                draggedItem = null
            }, 0)
        })
    })
    dragContainers.forEach(container => {
        container.addEventListener("dragover", e => e.preventDefault())
        container.addEventListener("dragenter", e => e.preventDefault())
        container.addEventListener("drop", e => {
            container.appendChild(draggedItem)
            const dataMeal = document.querySelector("[data-meal]")
            const dataMealVal = dataMeal.getAttribute("data-meal")
            const newDateVal = container.getAttribute("data-date")
            console.log(newDateVal)
            RecipeAPIHandler.changeMealDate(dataMealVal, newDateVal)
        })
    })
})
const dragContainers = document.querySelectorAll(".dragabbles-container")
const draggableCards = document.querySelectorAll(".draggable-item")

let draggedItem = null

window.addEventListener('load', () => {
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
        })
    })
})
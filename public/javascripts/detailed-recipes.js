//Selectors
const seeSimilarBtn = document.querySelector(".see-similar-btn")
const similarSection = document.querySelector(".results-section-similar")

//Event listeners
window.addEventListener('load', () => {

    seeSimilarBtn ?
        seeSimilarBtn.addEventListener("click", () => similarSection.classList.toggle("hidden")) :
        null

})
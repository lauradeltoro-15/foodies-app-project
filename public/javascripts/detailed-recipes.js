const seeSimilarBtn = document.querySelector(".see-similar-btn")
const similarSection = document.querySelector(".results-section-similar")
window.addEventListener('load', () => {
    seeSimilarBtn.addEventListener("click", () => similarSection.classList.toggle("hidden"))
})
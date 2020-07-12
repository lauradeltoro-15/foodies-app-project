const axios = require("axios")
class RecipeApiHandler {
    constructor(baseUrl, apiKey) {
        this.axiosApp = axios.create({
            baseURL: baseUrl
        })
        this.apiKey = apiKey
    }
    getFullList(query) {
        return this.axiosApp.get(`/recipes/complexSearch?query=${query}&apiKey=${this.apiKey}`)
            .then(response => response.data.results.map(data => data.id))
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipeInformationById(id) {
        return this.axiosApp.get(`recipes/${id}/information?includeNutrition=true&apiKey=${this.apiKey}`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipesInformationByIds(ids) {
        return this.axiosApp.get(`recipes/informationBulk?includeNutrition=true&ids=${ids}&apiKey=${this.apiKey}`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecommendations(tags) {
        return this.axiosApp.get(`/recipes/random?tags=${tags}&apiKey=${this.apiKey}`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }
    getSimilarRecipes(recipeId) {
        return this.axiosApp.get(`/recipes/${recipeId}/similar?number=3&apiKey=${this.apiKey}`)
            .then(response => response.data.map(recipe => recipe.id))
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipesByIngredients(ingredients) {
        return this.axiosApp.get(`/recipes/findByIngredients?ranking=1&number=9&ingredients=${ingredients}&apiKey=${this.apiKey}`)
            .then(response => response.data.map(recipe => recipe.id))
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipeByNutrition(nutritionQuery) {
        return this.axiosApp.get(`/recipes/findByNutrients?number=9&${nutritionQuery}&apiKey=${this.apiKey}`)
            .then(response => {
                return response.data.map(recipe => recipe.id)
            })
            .catch(err => {
                throw new Error(err)
            })
    }
}

module.exports = new RecipeApiHandler("https://api.spoonacular.com", "f1e871b479de4f4a9be20b64133fc19e")
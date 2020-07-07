const axios = require("axios")
class RecipeApiHandler {
    constructor(baseUrl) {
        this.axiosApp = axios.create({
            baseURL: baseUrl,
            headers: {
                "x-rapidapi-key": process.env.APIKEY
            }
        })
    }
    getFullList(query) {
        return this.axiosApp.get(`/recipes/complexSearch?query=${query}`)
            .then(response => response.data.results.map(data => data.id))
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipeInformationById(id) {
        return this.axiosApp.get(`recipes/${id}/information?includeNutrition=true`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }

}

module.exports = new RecipeApiHandler("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
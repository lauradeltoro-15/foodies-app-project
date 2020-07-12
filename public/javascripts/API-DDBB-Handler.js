class RecipeApiHandler {

    constructor(spoonacularApiKey) {
        this.axiosAPI = axios.create({
            baseURL: "https://api.spoonacular.com",
        })
        this.axiosServer = axios.create({
            baseURL: "http://localhost:3000"
        })
        this.spoonacularApiKey = spoonacularApiKey
    }

    getFullList(query) {
        return this.axiosAPI.get(`/recipes/complexSearch?query=${query}&apiKey=${this.spoonacularApiKey}`)
            .then(response => response.data.results.map(data => data.id))
            .catch(err => {
                throw new Error(err)
            })
    }

    getRecipeInformationById(id) {
        return this.axiosAPI.get(`recipes/${id}/information?includeNutrition=true&apiKey=${this.spoonacularApiKey}`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }

    guessNutritionValues(dishName) {
        return this.axiosAPI.get(`recipes/guessNutrition?title=${dishName}&apiKey=${this.spoonacularApiKey}`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }

    addToFavourites(recipeInfo, recipeId) {
        return this.axiosServer.post(`/recipes/add-to-favourites/${recipeId}`, recipeInfo)
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }

    deleteRecipe(recipeId) {
        return this.axiosServer.delete(`/profile/my-recipes/delete/${recipeId}`)
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }

    addRecipeToWeek(recipeId, mealDate) {
        return this.axiosServer.post(`/profile/my-recipes/add-to-week/${recipeId}`, {
                mealDate
            })
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }

    changeMealDate(mealDateChangesInfo) {
        return this.axiosServer.put("/profile/my-week/change-day", {
                mealDateChangesInfo
            })
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }

    deleteMealFromWeek(mealId) {
        return this.axiosServer.delete(`/profile/my-week/delete`, {
                mealId
            })
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }

    deleteIngredientFromShoppingList(ingredient) {
        return this.axiosServer.delete("/profile/my-shopping-list/delete", {
                ingredient
            })
            .then(response => response)
            .catch(err => {
                throw new Error(err)
            })
    }
}
const RecipeAPIHandler = new RecipeApiHandler("f1e871b479de4f4a9be20b64133fc19e")
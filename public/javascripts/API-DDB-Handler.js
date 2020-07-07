class RecipeApiHandler {
    constructor() {
        this.axiosAPI = axios.create({
            baseURL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            headers: {
                "x-rapidapi-key": "9bb56c9bc8msh80f4ea557c0f1a9p1a2052jsna9286dfaab2b"
            }
        })
        this.axiosServer = axios.create({
            baseURL: "http://localhost:5000/"
        })
    }
    getFullList(query) {
        return this.axiosAPI.get(`/recipes/complexSearch?query=${query}`)
            .then(response => response.data.results.map(data => data.id))
            .catch(err => {
                throw new Error(err)
            })
    }
    getRecipeInformationById(id) {
        return this.axiosAPI.get(`recipes/${id}/information?includeNutrition=true`)
            .then(response => response.data)
            .catch(err => {
                throw new Error(err)
            })
    }


    addToFavourites(recipeId) {
        console.log("recipeID", recipeId)
        return this.getRecipeInformationById(recipeId)
            .then(recipeInfo => {
                console.log(recipeInfo)
                this.axiosServer.post(`/recipes/add-to-favourites/${recipeId}`, recipeInfo)
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // addToFavourites(recipeId) {
    //     console.log("recipeID", recipeId)
    //     this.getRecipeInformationById(recipeId)
    //         .then(recipeInfo => {
    //             console.log(recipeInfo)
    //             this.axiosServer.post(`/recipes/add-to-favourites/${recipeId}`, recipeInfo)
    //         })
    //         .catch(err => {
    //             throw new Error(err)
    //         })
    // }

}

const RecipeAPIHandler = new RecipeApiHandler()
const express = require('express')
const router = express.Router()
const passport = require("passport")
const recipeApi = require("../../api-handler/recipe-handler")

const User = require("../../models/user.model")
const Recipe = require('../../models/recipe.model')

//Helpers
const renderAllRecipeInformationsByIds = (ids, res, req) => {
    Promise.all(ids.map(id => recipeApi.getRecipeInformationById(id)
            .then(response => response)
            .catch(err => console.log("There was an error returning from DDBB", err))))
        .then(recipes => req.query.filter ? filterRecipes(recipes, req) : recipes)
        .then(response => res.render("recipes/search-recipes", {
            results: response
        }))
        .catch(err => console.log("There was an error returning from ddbb", err))
}
const filterRecipes = (recipes, req) => {
    const filters = [...req.query.filter]
    return recipes.filter(recipe => filters.every(filter => recipe[filter]))
}
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "You have to log in to add to favourites!"
})
const isCurrentUser = (req, res, next) => req.isAuthenticated() && req.params.id === req.user.id ? next() : res.render("auth/login", {
    errorMsg: "You are not allowed to edit!"
})
const createRecipefromAPI = (APIData) => {
    const tags = ["vegetarian", "vegan", "glutenFree", "veryHealthy", "cheap"].filter(tag => APIData[tag])
    Recipe.create({
        
    })
}

//Routes
router.get('/details/:recipeID', (req, res) => {
    recipeApi.getRecipeInformationById(req.params.recipeID)
        .then(detailedRecipe => res.render("recipes/detailed-recipe", detailedRecipe))
})

router.get('/add-to-favourites/:recipeID', isLoggedIn, (req, res) => {
    recipeApi.getRecipeInformationById(req.params.recipeID)
        .then(response => createRecipefromAPI(response))
        .catch(err => console.log("There was an error", err))
})
router.get('/search', (req, res) => {
    recipeApi.getFullList(req.query.query)
        .then(response => response.results.map(result => result.id))
        .then(ids => renderAllRecipeInformationsByIds(ids, res, req))
        .catch(err => console.log("There was an error returning from ddbb", err))

})
router.get('/', (req, res) => res.render("recipes/search-recipes"))



module.exports = router
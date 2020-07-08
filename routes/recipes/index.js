const express = require('express')
const router = express.Router()
const passport = require("passport")
const recipeApi = require("../../api-handler/recipe-handler")

const User = require("../../models/user.model")
const Recipe = require('../../models/recipe.model')

//Helpers
const renderAllRecipeInformationsByIds = (ids, res, req, next) => {
    getAllRecipeInformationByIds(ids, req, next)
        .then(response => res.render("recipes/search-recipes", {
            results: response
        }))
        .catch(err => next(new Error(err)))
}
const getAllRecipeInformationByIds = (ids, req, next) => {
    return Promise.all(ids.map(id => recipeApi.getRecipeInformationById(id)
            .then(response => response)
            .catch(err => console.log("There was an error returning from DDBB", err))))
        .then(recipes => req.query.filter ? filterRecipes(recipes, req) : recipes)
        .catch(err => next(new Error(err)))

}
const filterRecipes = (recipes, req) => {
    const filters = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter]
    return recipes.filter(recipe => filters.every(filter => recipe[filter]))
}
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/auth/login")
const isCurrentUser = (req, res, next) => req.isAuthenticated() && req.params.id === req.user.id ? next() : res.render("auth/login", {
    errorMsg: "You are not allowed to edit!"
})
const createRecipeFromAPI = (APIData, req, next) => {
    const {
        vegetarian,
        vegan,
        glutenFree,
        veryHealthy,
        cheap
    } = APIData
    const nutrients = getAllNutrients(APIData)
    const steps = getAllSteps(APIData)
    const ingredients = getAllIngredients(APIData)
    const ingredientsAmount = getAllIngredientsWithAmounts(APIData)
    const amounts = getAllIngredientsAmounts(APIData)
    Recipe.create({
            amounts,
            title: APIData.title,
            originalID: APIData.id,
            image: APIData.image,
            nutrients,
            ingredients,
            ingredientsAmount,
            vegetarian,
            vegan,
            glutenFree,
            veryHealthy,
            cheap,
            steps,
            preparationMinutes: APIData.preparationMinutes,
            cookingMinutes: APIData.cookingMinutes,
            owner: req.user.id
        })
        .then(recipe => console.log("Recipe created", recipe))
        .catch(err => next(new Error(err)))
}

const getAllIngredientsAmounts = APIData => APIData.extendedIngredients ? APIData.extendedIngredients.map(elm => `${elm.amount} ${elm.unit}`) : APIData.ingredients ? APIData.ingredients.map(elm => `${elm.amount} ${elm.unit}`) : null

const getAllIngredients = APIData => APIData.extendedIngredients ? APIData.extendedIngredients.map(elm => elm.name) :
    APIData.ingredients ? APIData.ingredients.map(elm => elm.name) : null

const getAllIngredientsWithAmounts = APIData => APIData.extendedIngredients ? APIData.extendedIngredients.map(elm => elm.originalString) : APIData.ingredients ? APIData.ingredients.map(elm => elm.name) : null

const getAllSteps = APIData => APIData.analyzedInstructions[0] ? APIData.analyzedInstructions[0].steps.map(ob => ob.step) : APIData.instructions ? APIData.instructions.split(".") : null

const getAllNutrients = APIData => {
    return {
        calories: takeNutrientFromAPI(APIData, "Calories"),
        fat: takeNutrientFromAPI(APIData, "Fat"),
        carbohydrates: takeNutrientFromAPI(APIData, "Carbohydrates"),
        sugar: takeNutrientFromAPI(APIData, "Sugar"),
        protein: takeNutrientFromAPI(APIData, "Protein"),
        fiber: takeNutrientFromAPI(APIData, "Fiber")
    }
}
const takeNutrientFromAPI = (APIData, nutrient) => APIData.nutrition.nutrients.find(elm => elm.title === nutrient).amount

//Routes
router.get('/details/:recipeID', (req, res, next) => {
    recipeApi.getRecipeInformationById(req.params.recipeID)
        .then(detailedRecipe => res.render("recipes/detailed-recipe", detailedRecipe))
        .catch(err => next(new Error(err)))
})

router.post('/add-to-favourites/:recipeID', isLoggedIn, (req, res, next) => createRecipeFromAPI(req.body, req, ))

router.get('/search', (req, res, next) => {
    recipeApi.getFullList(req.query.query)
        .then(ids => renderAllRecipeInformationsByIds(ids, res, req, next))
        .catch(err => next(new Error(err)))
})

router.get('/', (req, res) => res.render("recipes/search-recipes"))

module.exports = router
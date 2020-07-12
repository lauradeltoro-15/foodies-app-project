const express = require('express')
const router = express.Router()
const passport = require("passport")
const recipeApi = require("../../api-handler/recipe-handler")

const User = require("../../models/user.model")
const Recipe = require('../../models/recipe.model')

//Helpers
const renderAllRecipeInformationsByIds = (ids, res, req, next, view) => {
    getAllRecipeInformationByIds(ids, req, next)
        .then(response => res.render(view, {
            user: req.user ? req.user.id : null,
            results: response
        }))
        .catch(err => next(new Error(err)))
}

const getAllRecipeInformationByIds = (ids, req, next) => {
    return Promise.all(ids.map(id => recipeApi.getRecipeInformationById(id)))
        .then(recipes => req.query.filter ? filterRecipes(recipes, req) : recipes)
        .catch(err => next(new Error(err)))
}

const getRecipeInformationWithSimilars = (similarIds, actualRecipeId, next) => {
    const IdsToString = similarIds.map(id => id.toString()).join(",")
    return Promise.all([recipeApi.getRecipeInformationById(actualRecipeId), recipeApi.getRecipesInformationByIds(IdsToString)])
        .then(response => response)
        .catch(err => next(new Error(err)))
}

const filterRecipes = (recipes, req) => {
    const filters = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter]
    return recipes.filter(recipe => filters.every(filter => recipe[filter]))
}

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/auth/login")

const createRecipeWithOwner = (recipe, owner, next) => {
    const {
        vegetarian,
        vegan,
        glutenFree,
        veryHealthy,
        cheap
    } = recipe
    const nutrients = getAllNutrients(recipe)
    const steps = getAllSteps(recipe)
    const ingredients = getAllIngredients(recipe)
    const ingredientsAmount = getAllIngredientsWithAmounts(recipe)
    const amounts = getAllIngredientsAmounts(recipe)
    return Recipe.create({
            amounts,
            title: recipe.title,
            originalID: recipe.id,
            image: recipe.image,
            nutrients,
            ingredients,
            ingredientsAmount,
            vegetarian,
            vegan,
            glutenFree,
            veryHealthy,
            cheap,
            steps,
            preparationMinutes: recipe.preparationMinutes,
            cookingMinutes: recipe.cookingMinutes,
            owner: owner.id
        })
        .then(recipe => recipe)
        .catch(err => next(new Error(err)))
}
const getArray = data => Array.isArray(data) ? data : [data]

const getAllIngredientsAmounts = recipe => recipe.extendedIngredients ? recipe.extendedIngredients.map(elm => `${elm.amount} ${elm.unit}`) : recipe.ingredients ? recipe.ingredients.map(elm => `${elm.amount} ${elm.unit}`) : null

const getAllIngredients = recipe => recipe.extendedIngredients ? recipe.extendedIngredients.map(elm => elm.name) :
    recipe.ingredients ? recipe.ingredients.map(elm => elm.name) : null

const getAllIngredientsWithAmounts = recipe => recipe.extendedIngredients ? recipe.extendedIngredients.map(elm => elm.originalString) : recipe.ingredients ? recipe.ingredients.map(elm => elm.name) : null

const getAllSteps = recipe => recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps.map(ob => ob.step) : recipe.instructions ? recipe.instructions.split(".") : null

const getAllNutrients = recipe => {
    return {
        calories: takeNutrientFromAPI(recipe, "Calories"),
        fat: takeNutrientFromAPI(recipe, "Fat"),
        carbohydrates: takeNutrientFromAPI(recipe, "Carbohydrates"),
        sugar: takeNutrientFromAPI(recipe, "Sugar"),
        proteins: takeNutrientFromAPI(recipe, "Protein"),
        fiber: takeNutrientFromAPI(recipe, "Fiber")
    }
}

const takeNutrientFromAPI = (recipe, nutrient) => hasNutrientsDefined ? recipe.nutrition.nutrients.find(elm => elm.title === nutrient).amount : null

const hasNutrientsDefined = recipe => recipe.nutrition.nutrients.find(elm => elm.title === nutrient) ? true : false

const getQueryString = (req) => {
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    const filteredKeys = keys.filter((key, i) => values[i] !== "")
    const filteredValues = values.filter(val => val !== "")
    return filteredKeys.map((key, i) => `${key}=${filteredValues[i]}`).join("&")
}

//Routes
router.get('/details/:recipeID', (req, res, next) => {

    recipeApi.getSimilarRecipes(req.params.recipeID)
        .then(similarsIds => getRecipeInformationWithSimilars(similarsIds, req.params.recipeID, next))
        .then(response => {
            res.render("recipes/detailed-recipe", {
                detailedRecipe: response[0],
                similarRecipes: response[1],
                user: req.user ? req.user : null
            })
        })
        .catch(err => next(new Error(err)))
})

router.post('/add-to-favourites/:recipeID', isLoggedIn, (req, res, next) => {
    createRecipeWithOwner(req.body, req.user, next)
        .then(response => res.send(`Recipe created: ${response}`))
        .catch(err => next(new Error(err)))

})

router.post("/search-by-ingredients", (req, res, next) => {
    const ingredients = getArray(req.body.ingredients).filter(elm => elm !== "").join(",")
    recipeApi.getRecipesByIngredients(ingredients)
        .then(ids => renderAllRecipeInformationsByIds(ids, res, req, next, "recipes/search-ingredients"))
        .catch(err => next(new Error(err)))
})

router.get("/search-by-ingredients", (req, res, next) => res.render("recipes/search-ingredients"))

router.post("/search-by-nutrients", (req, res, next) => {
    recipeApi.getRecipeByNutrition(getQueryString(req))
        .then(ids => renderAllRecipeInformationsByIds(ids, res, req, next, "recipes/search-nutrients"))
        .catch(err => next(new Error(err)))
})

router.get("/search-by-nutrients", (req, res, next) => res.render("recipes/search-nutrients"))

router.get('/search', (req, res, next) => {
    recipeApi.getFullList(req.query.query)
        .then(ids => renderAllRecipeInformationsByIds(ids, res, req, next, "recipes/search-recipes"))
        .catch(err => next(new Error(err)))
})

router.get('/', (req, res) => res.render("recipes/search-recipes"))

module.exports = router
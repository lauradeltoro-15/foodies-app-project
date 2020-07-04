const express = require('express')
const router = express.Router()
const recipeApi = require("../../api-handler/recipe-handler")

//Helpers
const renderAllRecipeInformationsByIds = (ids,res) => {
    Promise.all(ids.map(id => recipeApi.getRecipeInformationById(id)
            .then(response => response)))
            .then(response => {
                console.log(response)
                res.render("recipes/search-recipes", {results: response})
            })
            .catch(err => console.log("There was an error returning from ddbb", err))
}

//Routes
router.get('/details/:recipeID', (req, res) => {
    recipeApi.getRecipeInformationById(req.params.recipeID)
    .then(detailedRecipe => res.render("recipes/detailed-recipe", detailedRecipe))
})

router.post('/add-to-favourites/:recipeID', (req, res) => res.send('añadido a favoritos'))
router.get('/search', (req, res) => {
    recipeApi.getFullList(req.query.query)
        .then(response => response.results.map(result =>result.id))
        .then(ids => renderAllRecipeInformationsByIds(ids, res))
        .catch(err => console.log("There was an error returning from ddbb", err))

    })

router.get('/', (req, res) => res.render("recipes/search-recipes"))



module.exports = router



// const ids = response.results.map(result =>result.id)
// ids.forEach(id => recipeApi.getRecipeInformationById(id)
// .then(response => console.log(response)))
// res.render("recipes/search-recipes", {response})
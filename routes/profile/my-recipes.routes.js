const express = require('express')
const router = express.Router()

const Recipe = require('../../models/recipe.model')

// Endpoints

router.get('/add', (req, res) => {
    res.render('recipes/add-recipe')
})
router.post("/add", (req, res) => {
    const steps = [...req.body.steps]
    const ingredients = [...req.body.ingredients]
    const amounts = [...req.body.amount]
    const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)
    const tags = req.body.filter ? req.body.filter : []
    const {
        title,
        description,
        preparationMinutes,
        cookingMinutes
    } = req.body

    Recipe
        .create({
            title,
            description,
            ingredients,
            ingredientsAmount,
            steps,
            tags,
            preparationMinutes,
            cookingMinutes
        })
        .then(res.redirect('/profile/:userID/my-recipes'))
        .catch(err => console.log(err))

    console.log("ADDING")
})

router.get("/details/:recipeID", (req, res) => res.send("Here the details"))

router.get("/edit/:recipeID", (req, res) => {
    res.send("Editing recipes")
})
router.post("/edit/:recipeID", (req, res) => {
    res.send("Finish editing recipes")
})
router.post("/delete/:recipeID", (req, res) => {
    res.send("We are deleting")
})
router.get("/add-to-week/:recipeID", (req, res) => {
    res.send("Here adding to week")
})

router.get('/', (req, res) => {
    res.send('we are in my recipes')
})


module.exports = router
const express = require('express')
const router = express.Router()
const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")
const {
    findById
} = require('../../models/recipe.model')

const isCurrentUser = (req, res, next) => req.isAuthenticated() && req.params.userID === req.user.id ? next() : res.redirect("/auth/login")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

// Endpoints
router.get('/:userID/add', isCurrentUser, (req, res) => {
    const userID = req.params.userID

    res.render('recipes/add-recipe', {
        userID
    })
})
router.post("/:userID/add", cloudUploader.single('imageFile'), (req, res) => {

    const owner = req.params.userID
    const steps = [...req.body.steps]
    const ingredients = [...req.body.ingredients]
    const amounts = [...req.body.amount]
    const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)
    const tags = req.body.filter ? req.body.filter : []
    const {
        title,
        preparationMinutes,
        cookingMinutes
    } = req.body

    Recipe
        .create({
            title,
            image: req.file.url,
            ingredients,
            ingredientsAmount,
            steps,
            tags,
            owner,
            preparationMinutes,
            cookingMinutes
        })
        .then(res.redirect('/profile/my-recipes/:userID'))
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
router.post("/add-to-week/:recipeID", isLoggedIn, (req, res) => {
    Recipe.findById(req.params.recipeID)
        .then(recipe => {

            console.log(recipe.id, req.user.id, new Date())
            return {
                originalRecipe: recipe.id,
                ingredients: recipe.ingredients,
                owner: req.user.id,
                mealDay: req.body.mealDate
            }
        }).then(meal => {
            console.log(meal)
            Weekmeal.create(meal)
        })


        .catch(err => console.log("There was an error creating a meal", err))

})

router.get("/:userID", isLoggedIn, isCurrentUser, (req, res) => {

    Recipe
        .find({
            owner: req.params.userID
        })
        .then(theRecipes => {
            res.render(`profile/my-recipes`, {
                theRecipes,
                
            })
        })


})
router.get('/', isLoggedIn, (req, res) => {



    res.redirect(`/profile/my-recipes/${req.user.id}`)
})


module.exports = router
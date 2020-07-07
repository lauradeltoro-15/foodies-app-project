const express = require('express')
const router = express.Router()
const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")

//Falta añadir is current user
//función is admin
//Helper functions 
const isCurrentUser = (req, res, next) => req.isAuthenticated() && req.params.userID === req.user.id ? next() : res.redirect("/auth/login")
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

const obtainDate = (offset) => {
    let lastDate = new Date()
    lastDate.setDate(lastDate.getDate() + offset)
    const dd = String(lastDate.getDate()).padStart(2, '0')
    const mm = String(lastDate.getMonth() + 1).padStart(2, '0')
    const yyyy = lastDate.getFullYear()
    lastDate = yyyy + '-' + mm + '-' + dd
    return lastDate
}

const getArray = data => Array.isArray(data) ? data : [data]
const isTagTrue = (req, tag) => req.body[tag] ? true : false
const getWeekMeal = (recipe, req) => {
    return {
        originalRecipe: recipe.id,
        ingredients: recipe.ingredients,
        owner: req.user.id,
        mealDay: new Date(req.body.mealDate)
    }
}

// Endpoints
router.get('/:userID/add', isCurrentUser, (req, res) => res.render('recipes/add-recipe', {
    userID: req.params.userID
}))
router.post("/:userID/add", cloudUploader.single('imageFile'), (req, res) => {
    const steps = getArray(req.body.steps)
    const ingredients = getArray(req.body.ingredients)
    const amounts = getArray(req.body.amount)
    const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)
    const {
        title,
        preparationMinutes,
        cookingMinutes
    } = req.body

    Recipe
        .create({
            amounts,
            vegetarian: isTagTrue(req, 'vegetarian'),
            vegan: isTagTrue(req, 'vegan'),
            glutenFree: isTagTrue(req, 'glutenFree'),
            veryHealthy: isTagTrue(req, 'veryHealthy'),
            cheap: isTagTrue(req, 'cheap'),
            title,
            image: req.file ? req.file.url : null,
            ingredients,
            ingredientsAmount,
            steps,
            owner: req.user.id,
            preparationMinutes,
            cookingMinutes
        })
        .then(res.redirect('/profile/my-recipes/' + req.params.userID))
        .catch(err => console.log(err))
})

router.get("/details/:recipeID", (req, res) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => res.render('partials/detailedOwnerCardRecipe', theRecipe))
        .catch(err => console.log(err))
})

router.get("/edit/:recipeID", (req, res) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => res.render('recipes/edit-recipe', theRecipe))
        .catch(err => console.log(err))

})
router.post("/edit/:recipeID", isLoggedIn, cloudUploader.single('imageFile'), (req, res) => {

    const steps = getArray(req.body.steps)
    const ingredients = getArray(req.body.ingredients)
    const amounts = getArray(req.body.amount)
    const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)
    const {
        title,
        preparationMinutes,
        cookingMinutes
    } = req.body
    let originalImg
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => originalImg = theRecipe.image)
        .then(() => {
            Recipe
                .findByIdAndUpdate(req.params.recipeID, {
                    amounts,
                    vegetarian: isTagTrue(req, 'vegetarian'),
                    vegan: isTagTrue(req, 'vegan'),
                    glutenFree: isTagTrue(req, 'glutenFree'),
                    veryHealthy: isTagTrue(req, 'veryHealthy'),
                    cheap: isTagTrue(req, 'cheap'),
                    title,
                    image: req.file ? req.file.url : originalImg,
                    ingredients,
                    ingredientsAmount,
                    steps,
                    preparationMinutes,
                    cookingMinutes
                })
        })
        .then(res.redirect(`/profile/my-recipes/${req.user.id}`))
        .catch(err => console.log(err))

})
router.post("/delete/:recipeID", (req, res) => {
    Recipe
        .findByIdAndRemove(req.params.recipeID)
        .then(res.redirect(`/profile/my-recipes/${req.user.id}`))

})
router.post("/add-to-week/:recipeID", isLoggedIn, (req, res) => {
    console.log(req.body.mealDate)
    Recipe.findById(req.params.recipeID)
        .then(recipe => getWeekMeal(recipe, req))
        .then(meal => Weekmeal.create(meal))
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
                today: obtainDate(0),
                lastDay: obtainDate(6)
            })
        })


})
router.get('/', isLoggedIn, (req, res) => {
    res.redirect(`/profile/my-recipes/${req.user.id}`)
})

module.exports = router
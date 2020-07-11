const express = require('express')
const router = express.Router()
const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")

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
router.get('/:userID/add', isLoggedIn, (req, res) => res.render('recipes/add-recipe', {
    userID: req.params.userID
}))

router.post("/:userID/add", cloudUploader.single('imageFile'), (req, res, next) => {
    const steps = getArray(req.body.steps)
    const ingredients = getArray(req.body.ingredients)
    const amounts = getArray(req.body.amount)
    const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)
    const {
        calories,
        proteins,
        fat,
        carbohydrates,
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
            nutrients: {
                calories,
                proteins,
                fat,
                carbohydrates
            },
            image: req.file ? req.file.url : null,
            ingredients,
            ingredientsAmount,
            steps,
            owner: req.user.id,
            preparationMinutes,
            cookingMinutes
        })
        .then(response => {
            res.redirect('/profile/my-recipes/' + req.params.userID)
        })
        .catch(err => next(new Error(err)))
})

router.get("/details/:recipeID", (req, res, next) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => res.render('partials/detailedOwnerCardRecipe', theRecipe))
        .catch(err => next(new Error(err)))
})

router.get("/edit/:recipeID", (req, res, next) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => res.render('recipes/edit-recipe', theRecipe))
        .catch(err => next(new Error(err)))

})
router.post("/edit/:recipeID", isLoggedIn, cloudUploader.single('imageFile'), (req, res, next) => {
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
        .then(theRecipe => {
            originalImg = theRecipe.image
            return
        })
        .then(() => {
            return Recipe
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
        .then(() => {
            res.redirect(`/profile/my-recipes/${req.user.id}`)
        })
        .catch(err => next(new Error(err)))

})
router.delete("/delete/:recipeID", (req, res, next) => {
    Recipe
        .findByIdAndRemove(req.params.recipeID)
        .then(response => res.send(`recipe deleted: ${response}`))
        .catch(err => next(new Error(err)))
})

router.post("/add-to-week/:recipeID", isLoggedIn, (req, res, next) => {
    return Recipe.findById(req.params.recipeID)
        .then(recipe => getWeekMeal(recipe, req))
        .then(meal => Weekmeal.create(meal))
        .then(response => res.send(response))
        .catch(err => next(new Error(err)))
})

router.get("/:userID", isLoggedIn, isCurrentUser, (req, res, next) => {
    Recipe
        .find({
            owner: req.params.userID
        })
        .then(theRecipes => {
            res.render(`profile/my-recipes`, {
                theRecipes,
                today: obtainDate(0),
                lastDay: obtainDate(6),
                user: req.params.userID
            })
        })
        .catch(err => next(new Error(err)))
})
router.get('/', isLoggedIn, (req, res) => res.redirect(`/profile/my-recipes/${req.user.id}`))

module.exports = router
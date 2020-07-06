const express = require('express')
const router = express.Router()
const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const { findById } = require('../../models/recipe.model')

const isCurrentUser = (req, res, next) => req.isAuthenticated() && req.params.userID === req.user.id ? next() : res.redirect("/auth/login")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

// Endpoints
router.get('/:userID/add', isCurrentUser, (req, res) => {
    const userID = req.params.userID

    res.render('recipes/add-recipe', { userID })
})
router.post("/:userID/add", cloudUploader.single('imageFile'), (req, res) => {
    const steps = Array.isArray(req.body.steps) ? req.body.steps : [req.body.steps]
    const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]
    const amounts = Array.isArray(req.body.amount) ? req.body.amount : [req.body.amount]
    const owner = req.params.userID
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
            image: req.file.url,
            ingredients,
            ingredientsAmount,
            steps,
            owner,
            preparationMinutes,
            cookingMinutes
        })
        .then(res.redirect('/profile/my-recipes/' + req.params.userID))
        .catch(err => console.log(err))

    console.log("ADDING")
})
const isTagTrue = (req, tag) => req.body[tag] ? true : false

router.get("/details/:recipeID", (req, res) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => {
            console.log(theRecipe)
            res.render('partials/detailedOwnerCardRecipe', theRecipe)
        })
        .catch(err => console.log(err))

})

router.get("/edit/:recipeID", (req, res) => {
    Recipe
        .findById(req.params.recipeID)
        .then(theRecipe => {
            res.render('recipes/edit-recipe', theRecipe)
            console.log(theRecipe)
        })
        .catch(err => console.log(err))

})
router.post("/edit/:recipeID", (req, res) => {

    
     console.log('este es mi req.body ', req.body)

    // const steps = Array.isArray(req.body.steps) ? req.body.steps : [req.body.steps]
    // const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [req.body.ingredients]
    // const amounts = Array.isArray(req.body.amount) ? req.body.amount : [req.body.amount]
    // const owner = req.params.userID
    // const ingredientsAmount = ingredients.map((ingredient, i) => `${amounts[i]} ${ingredient}`)

    // const {
    //     title,
    //     preparationMinutes,
    //     cookingMinutes
    // } = req.body


    // Recipe
    //     .findByIdAndUpdate(req.params.recipeID, {
    //         amounts,
    //         vegetarian: isTagTrue(req, 'vegetarian'),
    //         vegan: isTagTrue(req, 'vegan'),
    //         glutenFree: isTagTrue(req, 'glutenFree'),
    //         veryHealthy: isTagTrue(req, 'veryHealthy'),
    //         cheap: isTagTrue(req, 'cheap'),
    //         title,
    //         //image: req.file.url,
    //         ingredients,
    //         ingredientsAmount,
    //         steps,
    //         preparationMinutes,
    //         cookingMinutes
    //     })
    //     .then(res.redirect('/'))
    //     .catch(err => console.log(err))

})
router.post("/delete/:recipeID", (req, res) => {
    Recipe
        .findByIdAndRemove(req.params.recipeID)
        .then(res.redirect(`/profile/my-recipes/${req.user.id}`))

})
router.get("/add-to-week/:recipeID", (req, res) => {
    res.send("Here adding to week")
})

router.get("/:userID", isLoggedIn, isCurrentUser, (req, res) => {

    Recipe
        .find({ owner: req.params.userID })
        .then(theRecipes => {
            console.log(theRecipes)
            res.render(`profile/my-recipes`, { theRecipes })
        })
        .catch(err => console.log(err))


})
router.get('/', isLoggedIn, (req, res) => {



    res.redirect(`/profile/my-recipes/${req.user.id}`)
})


module.exports = router
const express = require('express')
const router = express.Router()
const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

// Endpoints
router.get('/add', (req, res) => {
    res.render('recipes/add-recipe')
})
router.post("/add", cloudUploader.single('imageFile'), (req, res) => {
    console.log(req.file)
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
            image: req.file.url,
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

router.get("/:userId",isLoggedIn, (req, res) => {
    console.log(req.user)
    res.render(`profile/my-recipes`, {
        user: req.user
    })
})
router.get('/',isLoggedIn, (req, res) => {
    res.redirect(`/profile/my-recipes/${req.user.id}`)
})


module.exports = router
const express = require('express')
const router = express.Router()
const passport = require("passport")
const recipeApi = require("../../api-handler/recipe-handler")

const User = require("../../models/user.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Log in for recomendations!"
})
const haveInterestsDeclared = (req, res, next) => req.user.interests.cuisines.length !== 0 || req.user.interests.diets.length !== 0 ? next() : res.render(`profile/my-profile`, {
    errorMsg: "Fill in your interests for recomendations!",
    user: req.user
})

router.get("/", isLoggedIn, haveInterestsDeclared, (req, res, next) => {
    const cuisines = req.user.interests.cuisines ? req.user.interests.cuisines[Math.floor(Math.random() * req.user.interests.cuisines.length)] : ""
    const diets = req.user.interests.cuisines ? req.user.interests.diets.join(",") : ""

    recipeApi.getRecommendations(`${cuisines},${diets}`)
        .then(recipeRecommendation => res.render("recipes/detailed-recipe", recipeRecommendation.recipes[0]))
        .catch(err => next(new Error(err)))
})

module.exports = router
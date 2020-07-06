const express = require('express')
const router = express.Router()
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})
// Endpoints
router.post("/delete/:recipeId", (req, res) => res.send("Deleting"))


router.get("/:userId",isLoggedIn, (req, res) => {
    Weekmeal.find()
    .populate("Weekmeal")
    .then()
    console.log(req.user)
    res.render(`profile/my-week`, {
        user: req.user
    })
})
router.get('/',isLoggedIn, (req, res) => {
    res.redirect(`/profile/my-week/${req.user.id}`)
})

module.exports = router
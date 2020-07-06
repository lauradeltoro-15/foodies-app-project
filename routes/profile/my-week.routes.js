const express = require('express')
const router = express.Router()
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

const getDayOffset = (dateToCompare) => {
    const today = new Date()
    return dateToCompare - today.getDate()

}

// Endpoints
router.post("/delete/:recipeId", (req, res) => res.send("Deleting"))


router.get("/:userId", isLoggedIn, (req, res) => {
    Weekmeal.find()
        .populate("Weekmeal")
        .then()
    res.render(`profile/my-week`, {
        user: req.user
    })
})
router.get('/', isLoggedIn, (req, res) => {
    Weekmeal.find({
            owner: req.user.id
        })
        .then(weekmeals => {
            return {
                day1: weekmeals.filter(meal => getDayOffset(meal.mealDay) === 0)
            }
        }).then(day => {
            console.log(day)
            res.render("profile/my-week")
        })
        .catch(err => console.log("There was an error returning from DDBB", err))

})

module.exports = router
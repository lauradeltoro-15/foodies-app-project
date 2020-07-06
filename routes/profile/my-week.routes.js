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
    return dateToCompare.getDate() - today.getDate()

}
const getMealPlanner = (weekmeals) => {
    const today = new Date()
    return [getDayMeals(weekmeals, 0, today), getDayMeals(weekmeals, 1, today), getDayMeals(weekmeals, 2, today), getDayMeals(weekmeals, 3, today), getDayMeals(weekmeals, 4, today), getDayMeals(weekmeals, 5, today), getDayMeals(weekmeals, 6, today)]
}
const getDayMeals = (weekmeals, offset, today) => {
    return {
        cards: weekmeals.filter(meal => getDayOffset(meal.mealDay) === offset),
        date: `${weekDays[getWeekDayToRender(offset, today)]} ${today.getDate() + offset}`
    }
}
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const getWeekDayToRender = (offset, today) => today.getDay() + offset < 7 ? today.getDay() + offset : today.getDay() + offset - 7
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
        }).populate("originalRecipe")
        .then(weekmeals => getMealPlanner(weekmeals))
        .then(daysInfo => {
            console.log(daysInfo[0].cards[0])
            res.render("profile/my-week", {
                daysInfo
            })
        })
        .catch(err => console.log("There was an error returning from DDBB", err))

})

module.exports = router
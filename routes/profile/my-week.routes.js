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
    const daysValues = []
    for (let i = 0; i < 7; i++) {
        daysValues.push(getDayMeals(weekmeals, i, today))
    }
    return daysValues
}
const getDayMeals = (weekmeals, offset, today) => {
    return {
        cards: weekmeals.filter(meal => getDayOffset(meal.mealDay) === offset),
        date: `${weekDays[getWeekDayToRender(offset, today)]} ${today.getDate() + offset}`,
        fullDate: obtainDate(offset)
    }
}
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const getWeekDayToRender = (offset, today) => today.getDay() + offset < 7 ? today.getDay() + offset : today.getDay() + offset - 7

const obtainDate = (offset) => {
    let lastDate = new Date()
    lastDate.setDate(lastDate.getDate() + offset)
    const dd = String(lastDate.getDate()).padStart(2, '0')
    const mm = String(lastDate.getMonth() + 1).padStart(2, '0')
    const yyyy = lastDate.getFullYear()
    lastDate = yyyy + '-' + mm + '-' + dd
    return lastDate
}

// Endpoints
router.post("/change-day", (req, res) => {
    console.log(req.body)
    const newDate = new Date(req.body.newDateVal)
    console.log(newDate)
    return Weekmeal.findByIdAndUpdate(req.body.mealId, {
            mealDay: newDate
        })
        .then(response => console.log(response))
        .catch(err => console.log("There was an err", err))

})
router.post("/delete/:recipeId", (req, res) => res.send("Deleting"))


router.get("/:userId", isLoggedIn, (req, res) => {
    Weekmeal.find()
        .populate("Weekmeal")
        .then(res.render(`profile/my-week`, {
            user: req.user
        }))
})
router.get('/', isLoggedIn, (req, res) => {
    Weekmeal.find({
            owner: req.user.id
        }).populate("originalRecipe")
        .then(weekmeals => weekmeals.filter(meal => meal.originalRecipe))
        .then(filteredWeekmeals => getMealPlanner(filteredWeekmeals))
        .then(daysInfo => res.render("profile/my-week", {
            daysInfo
        }))
        .catch(err => console.log("There was an error returning from DDBB", err))
})

module.exports = router
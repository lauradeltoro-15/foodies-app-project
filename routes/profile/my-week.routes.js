const express = require('express')
const router = express.Router()
const passport = require("passport")

const Weekmeal = require("../../models/week-meal.model")

//Helper functions
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
router.post("/change-day", (req, res, next) => {
    return Promise.all(req.body.mealDateChangesInfo.map(elm => {
            const newDate = new Date(elm.newDateVal)
            return Weekmeal.findByIdAndUpdate(elm.dataMealVal, {
                mealDay: newDate
            }, {
                new: true
            })
        })).then(response => response)
        .catch(err => next(new Error(err)))
})

router.post("/delete", (req, res, next) => {
    Weekmeal.findByIdAndRemove(req.body.mealId)
        .then(removeInfo => removeInfo)
        .catch(err => next(new Error(err)))
})

router.get("/:userId", isLoggedIn, (req, res, next) => {
    Weekmeal.find()
        .populate("Weekmeal")
        .then(() => res.render(`profile/my-week`, {
            user: req.user
        }))
        .catch(err => next(new Error(err)))
})

router.get('/', isLoggedIn, (req, res, next) => {
    Weekmeal.find({
            owner: req.user.id
        }).populate("originalRecipe")
        .then(weekmeals => weekmeals.filter(meal => meal.originalRecipe))
        .then(filteredWeekmeals => getMealPlanner(filteredWeekmeals))
        .then(daysInfo => res.render("profile/my-week", {
            daysInfo
        }))
        .catch(err => next(new Error(err)))
})

module.exports = router
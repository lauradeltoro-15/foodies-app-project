const express = require('express')
const router = express.Router()
const passport = require("passport")

const Weekmeal = require("../../models/week-meal.model")

//Helper functions 
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

const filterUniqueIngredients = (ingredients) => ingredients.filter((ingredient, i) => ingredients.indexOf(ingredient) === i && ingredient !== null)

const filterIngredients = weekmeals => filterUniqueIngredients(filterIngredientsByRecipeDay(weekmeals))

const getUpdatedIngredientList = (meal, ingredientToRemove) => meal.ingredients.filter(ingredient => ingredient !== ingredientToRemove)

const filterIngredientsByRecipeDay = weekmeals => {
    const today = (new Date()).getDate()
    const lastDay = today + 6
    return weekmeals.filter(meal => meal.mealDay.getDate() >= today && meal.mealDay.getDate() <= lastDay).map(meal => meal.ingredients).flat();
}

//Routes
router.delete("/delete", (req, res, next) => {
    Weekmeal.find({
            ingredients: {
                $in: [`${req.body.ingredient}`]
            }
        })
        .then(weekmealsToModify => {
            let findByIdAndUpdateCalls = [];
            weekmealsToModify.forEach(meal => {
                findByIdAndUpdateCalls.push(
                    Weekmeal.findByIdAndUpdate(meal.id, {
                        ingredients: getUpdatedIngredientList(meal, req.body.ingredient)
                    }, {
                        new: true
                    })
                    .then(response => response)
                    .catch(err => next(new Error(err)))
                )
            })
            Promise.all(findByIdAndUpdateCalls)
                .then(() => res.send(`${req.body.ingredient} removed`))
                .catch(err => next(new Error(err)))
        })
})
router.get("/:userId", isLoggedIn, (req, res, next) => {
    Weekmeal.find({
            owner: req.user.id
        }, {
            mealDay: 1,
            ingredients: 1
        })
        .then(weekmeals => filterIngredients(weekmeals))
        .then(filteredWeekMeals => res.render(`profile/my-shopping-list`, {
            filteredWeekMeals
        }))
        .catch(err => next(new Error(err)))
})
router.get('/', isLoggedIn, (req, res) => res.redirect(`/profile/my-shopping-list/${req.user.id}`))

module.exports = router
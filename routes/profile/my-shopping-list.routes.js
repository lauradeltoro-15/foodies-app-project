const express = require('express')
const router = express.Router()
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")
const Weekmeal = require("../../models/week-meal.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})
const filterIngredients = weekmeals => filterUniqueIngredients(filterIngredientsByRecipeDay(weekmeals))


const filterIngredientsByRecipeDay = weekmeals => {
    const today = (new Date()).getDate()
    const lastDay = today + 6
    return weekmeals.filter(meal => meal.mealDay.getDate() >= today && meal.mealDay.getDate() <= lastDay).map(meal => meal.ingredients).flat();
}
const filterUniqueIngredients = (ingredients) => ingredients.filter((ingredient, i) => ingredients.indexOf(ingredient) === i && ingredient !== null)

router.get("/add", (req, res) => res.send("Here I add to the shopping list"))
router.post("/add", (req, res) => res.send("Here I finish to add to the shopping list"))
router.post("/delete", (req, res) => res.send("Here deleting"))
router.get("/edit", (req, res) => res.send("Here I edit to the shopping list"))
router.post("/edit", (req, res) => res.send("Here I finish to edit to the shopping list"))

router.get("/:userId", isLoggedIn, (req, res) => {

    Weekmeal.find({}, {
            mealDay: 1,
            ingredients: 1
        })
        .then(weekmeals => filterIngredients(weekmeals))
        .then(filteredWeekMeals => res.render(`profile/my-shopping-list`, {
            filteredWeekMeals
        }))
        .catch(err => console.log("There was an error returning from DDBB", err))
})
router.get('/', isLoggedIn, (req, res) => {
    res.redirect(`/profile/my-shopping-list/${req.user.id}`)
})

module.exports = router
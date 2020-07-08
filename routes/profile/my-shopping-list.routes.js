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


router.post("/delete", (req, res) => {
    console.log(req.body.ingredient)

    return Weekmeal.find({
            ingredients: {
                $in: [`${req.body.ingredient}`]
            }
        }, {})
        .then(weekmealsToModify => {
            return weekmealsToModify.forEach(meal => {
                console.log(meal.id)
                const newLocal = getUpdatedIngredientList(meal, req.body.ingredient)
                console.log(newLocal)
                Weekmeal.findByIdAndUpdate(meal.id, {
                        ingredients: newLocal
                    }, {new: true})
                    .then(objUpdated => console.log("NEW OBJECT", objUpdated))
                    .catch(err => console.log("There was an error".err))
            })
        })
        .then(ingredientsListsFiltered => console.log("ingredients", ingredientsListsFiltered))
        .catch(err => console.log("There was an error", err))
})



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

function getUpdatedIngredientList(meal, ingredientToRemove) {
    return meal.ingredients.filter(ingredient => {
        console.log("This is ingredient", ingredient, "this is req.body.ingredient", ingredientToRemove)
        return ingredient !== ingredientToRemove
    })
}
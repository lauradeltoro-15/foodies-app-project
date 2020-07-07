const express = require('express')
const router = express.Router()
const passport = require("passport")

const Recipe = require('../../models/recipe.model')
const User = require("../../models/user.model")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

router.get("/add", (req, res) => res.send("Here I add to the shopping list"))
router.post("/add", (req, res) => res.send("Here I finish to add to the shopping list"))
router.post("/delete", (req, res) => res.send("Here deleting"))
router.get("/edit", (req, res) => res.send("Here I edit to the shopping list"))
router.post("/edit", (req, res) => res.send("Here I finish to edit to the shopping list"))

router.get("/:userId", isLoggedIn, (req, res) => {
    console.log(req.user)
    res.render(`profile/my-shopping-list`, {
        user: req.user
    })
})
router.get('/', isLoggedIn, (req, res) => {
    res.redirect(`/profile/my-shopping-list/${req.user.id}`)
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require("../../models/user.model")
const passport = require("passport")

const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})

router.get("/:userId",isLoggedIn, (req, res) => {
    console.log(req.user)
    res.render(`profile/my-profile`, {
        user: req.user
    })
})

router.get("/", isLoggedIn, (req, res) => {
    res.redirect(`/profile/${req.user.id}`)
})


module.exports = router
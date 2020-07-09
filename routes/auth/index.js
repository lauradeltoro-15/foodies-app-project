const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// User signup
router.get("/signup", (req, res) => res.render("auth/signup"))
router.post("/signup", (req, res, next) => {

    const {
        username,
        password
    } = req.body

    if (!username || !password) {
        res.render("auth/signup", {
            errorMsg: "Enter a username and password"
        })
        return
    }

    User.findOne({
            username
        })
        .then(user => {
            if (user) {
                res.render("auth/signup", {
                    errorMsg: "That username already exists"
                })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({
                    username,
                    password: hashPass
                })
                .then(() => res.redirect("/auth/login"))
                .catch(err => next(new Error(err)))

        })
        .catch(err => next(new Error(err)))
})


// User login
router.get('/login', (req, res) => res.render('auth/login', {
    "errorMsg": req.flash("error")
}))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Please, fill the fields'
}), (req, res) => console.log(req.user))

// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/auth/login")
})

module.exports = router
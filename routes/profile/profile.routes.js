const multer = require("multer")
const cloudUploader = require('../../configs/cloudinary.config')
const express = require('express')
const router = express.Router()
const User = require("../../models/user.model")
const passport = require("passport")

const getArray = data => Array.isArray(data) ? data : [data]
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render("auth/login", {
    errorMsg: "Restricted area!"
})
router.get("/edit/:userID", isLoggedIn, (req, res, next) => {
    User.findById(req.params.userID)
        .then(user => res.render(`profile/edit-profile`, user))
        .catch(err => next(new Error(err)))
})
router.post("/edit/:userID", isLoggedIn, cloudUploader.single('imageFile'), (req, res, next) => {
    console.log(req.body)
    const {
        description
    } = req.body
    const cuisines = getArray(req.body.cuisines)
    const diets = getArray(req.body.diets)
    User
        .findById(req.params.userID)
        .then(user => user.image)
        .then(userOriginalImage => {
            return User.findByIdAndUpdate(req.params.userID, {
                description,
                image: req.file ? req.file.url : userOriginalImage,
                interests: {
                    cuisines: cuisines || null,
                    diets: diets || null
                }
            })
        }).then(() => {
            res.redirect(`/profile/${req.user.id}`)
        })
        .catch(err => next(new Error(err)))

})
router.get("/:userID", isLoggedIn, (req, res, next) => res.render(`profile/my-profile`, {
    user: req.user
}))

router.get("/", isLoggedIn, (req, res, next) => res.redirect(`/profile/${req.user.id}`))

module.exports = router
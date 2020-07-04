const express = require('express')
const router = express.Router()

// Endpoints

router.get('/add', (req, res) => {
    res.send("Adding recipes")
})
router.post("/add", (req, res) => console.log("ADDING"))

router.get("/details/:recipeID", (req, res) => res.send("Here the details"))

router.get("/edit/:recipeID", (req, res) => {
    res.send("Editing recipes")
})
router.post("/edit/:recipeID", (req, res) => {
    res.send("Finish editing recipes")
})
router.post("/delete/:recipeID", (req, res) => {
    res.send("We are deleting")
})
router.get("/add-to-week/:recipeID", (req, res) => {
    res.send("Here adding to week")
})

router.get('/', (req, res) => {
    res.send('we are in my recipes')
})


module.exports = router
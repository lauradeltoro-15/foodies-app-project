const express = require('express')
const router = express.Router()

router.get("/add", (req, res) => res.send("Here I add to the shopping list"))
router.post("/add", (req, res) => res.send("Here I finish to add to the shopping list"))
router.post("/delete", (req, res) => res.send("Here deleting"))
router.get("/edit", (req, res) => res.send("Here I edit to the shopping list"))
router.post("/edit", (req, res) => res.send("Here I finish to edit to the shopping list"))
router.get('/', (req, res) => res.send('Here the shopping list'))

module.exports = router
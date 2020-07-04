const express = require('express')
const router = express.Router()

// Endpoints
router.get("/", (req, res) => res.send("Here my week"))
router.post("/delete/:recipeId", (req, res) => res.send("Deleting"))

module.exports = router
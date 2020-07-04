const express = require('express')
const router = express.Router()


router.get("/:id", (req, res) => res.send("this is my profile"))

module.exports = router
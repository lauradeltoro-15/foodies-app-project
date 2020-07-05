const express = require('express')
const router = express.Router()

router.use('/:userId/my-recipes', require("./my-recipes.routes"))
router.use('/:userId/my-shopping-list', require("./my-shopping-list.routes"))
router.use('/:userId/my-week', require("./my-week.routes"))
router.use('/', require("./profile.routes"))

module.exports = router



  
const express = require('express')
const router = express.Router()

router.use('/my-recipes', require("./my-recipes.routes"))
router.use('/my-shopping-list', require("./my-shopping-list.routes"))
router.use('/my-week', require("./my-week.routes"))
router.use('/recommendation', require("./recommendation.routes"))
router.use('/', require("./profile.routes"))

module.exports = router
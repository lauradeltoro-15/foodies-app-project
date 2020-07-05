const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiRecipeSchema = new Schema({
    title: String
}, {
    timestamps: true,
    strict: false
})

const ApiRecipe = mongoose.model("ApiRecipe", apiRecipeSchema);
module.exports = ApiRecipe;
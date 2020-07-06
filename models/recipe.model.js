const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        //required: true
    },
    originalID: {
        type: Number
    },
    image: {
        type: String
    },
    nutrients: {
        calories: Number,
        fat: Number,
        carbohydrates: Number,
        sugar: Number,
        protein: Number,
        fiber: Number
    },
    steps: {
        type: [String],
        //required: true
    },
    ingredients: {
        type: [String],
        //required: true
    },
    ingredientsAmount: {
        type: [String]
    },
    tags: {
        type: [String],
        enum: ["vegetarian", "vegan", "glutenFree", "veryHealthy", "cheap"]
    },
    preparationMinutes: {
        type: Number
    },
    cookingMinutes: {
        type: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
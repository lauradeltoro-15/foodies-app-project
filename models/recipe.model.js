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
        protein: Number,
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
    amounts: {
        type: [String]
    },
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    veryHealthy: Boolean,
    cheap: Boolean,
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
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weekMealSchema = new Schema({
    originalRecipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    ingredients: [String],
    mealDay: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const Weekmeal = mongoose.model("Weekmeal", weekMealSchema);
module.exports = Weekmeal;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: ["EDITOR", "ADMIN"],
        default: "EDITOR"
    },
    recipes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipes'
        }]
    },
    weekRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }]
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;
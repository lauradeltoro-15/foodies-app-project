// const mongoose = require("../configs/mongoose.config")
// const User = require("../models/user.model")
// const Recipe = require("../models/user.model")

// const apiValues = [
//     {
//         "id": 589833,
//         "title": "Black Garlic Noodles – Umami blast",
//         "image": "https://spoonacular.com/recipeImages/589833-312x231.jpg",
//         "imageType": "jpg",
//         "usedIngredientCount": 1,
//         "missedIngredientCount": 2,
//         "missedIngredients": [
//             {
//                 "id": 11165,
//                 "amount": 1.0,
//                 "unit": "handful",
//                 "unitLong": "handful",
//                 "unitShort": "handful",
//                 "aisle": "Produce;Spices and Seasonings",
//                 "name": "cilantro",
//                 "original": "handful of chopped cilantro or herbs",
//                 "originalString": "handful of chopped cilantro or herbs",
//                 "originalName": "chopped cilantro or herbs",
//                 "metaInformation": [
//                     "chopped"
//                 ],
//                 "meta": [
//                     "chopped"
//                 ],
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/cilantro.png"
//             },
//             {
//                 "id": 11215,
//                 "amount": 8.0,
//                 "unit": "cloves",
//                 "unitLong": "cloves",
//                 "unitShort": "cloves",
//                 "aisle": "Produce",
//                 "name": "garlic",
//                 "original": "about 8 cloves black garlic, sliced thinly",
//                 "originalString": "about 8 cloves black garlic, sliced thinly",
//                 "originalName": "about black garlic, sliced thinly",
//                 "metaInformation": [
//                     "black",
//                     "sliced"
//                 ],
//                 "meta": [
//                     "black",
//                     "sliced"
//                 ],
//                 "extendedName": "black garlic",
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
//             }
//         ],
//         "usedIngredients": [
//             {
//                 "id": 20420,
//                 "amount": 0.5,
//                 "unit": "pound",
//                 "unitLong": "pounds",
//                 "unitShort": "lb",
//                 "aisle": "Pasta and Rice",
//                 "name": "noodles",
//                 "original": "1/2 pound dry noodles or about 2 heaping cups of cooked noodles",
//                 "originalString": "1/2 pound dry noodles or about 2 heaping cups of cooked noodles",
//                 "originalName": "dry noodles or about 2 heaping cups of cooked noodles",
//                 "metaInformation": [
//                     "dry",
//                     "cooked"
//                 ],
//                 "meta": [
//                     "dry",
//                     "cooked"
//                 ],
//                 "extendedName": "cooked dry noodles",
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
//             }
//         ],
//         "unusedIngredients": [],
//         "likes": 140
//     },
//     {
//         "id": 1049530,
//         "title": "Leftover Mashed Potatoes Gnocchi",
//         "image": "https://spoonacular.com/recipeImages/1049530-312x231.jpg",
//         "imageType": "jpg",
//         "usedIngredientCount": 0,
//         "missedIngredientCount": 2,
//         "missedIngredients": [
//             {
//                 "id": 1123,
//                 "amount": 1.0,
//                 "unit": "",
//                 "unitLong": "",
//                 "unitShort": "",
//                 "aisle": "Milk, Eggs, Other Dairy",
//                 "name": "egg",
//                 "original": "1 egg",
//                 "originalString": "1 egg",
//                 "originalName": "egg",
//                 "metaInformation": [],
//                 "meta": [],
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/egg.png"
//             },
//             {
//                 "id": 98853,
//                 "amount": 4.0,
//                 "unit": "servings",
//                 "unitLong": "servings",
//                 "unitShort": "servings",
//                 "aisle": "Pasta and Rice;Refrigerated;Frozen",
//                 "name": "gnocchi",
//                 "original": "Don't forget to read the recipe notes before you start – they'll help you make the best gnocchi possible!",
//                 "originalString": "Don't forget to read the recipe notes before you start – they'll help you make the best gnocchi possible!",
//                 "originalName": "Don't forget to read the recipe notes before you start – they'll help you make the best gnocchi possible",
//                 "metaInformation": [],
//                 "meta": [],
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/gnocchi-isolated.jpg"
//             }
//         ],
//         "usedIngredients": [],
//         "unusedIngredients": [
//             {
//                 "id": 20420,
//                 "amount": 1.0,
//                 "unit": "serving",
//                 "unitLong": "serving",
//                 "unitShort": "serving",
//                 "aisle": "Pasta and Rice",
//                 "name": "pasta",
//                 "original": "pasta",
//                 "originalString": "pasta",
//                 "originalName": "pasta",
//                 "metaInformation": [],
//                 "meta": [],
//                 "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
//             }
//         ],
//         "likes": 1
//     }
// ]

// apiValues.forEach(rec => Recipe.create({
//     title: rec.title,
//     originalID: rec.id,  
// })).then(created => )


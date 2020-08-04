# _Foodies App

_foodies App is a Desktop Web Application for cooking and meal planning.

## Features

It has the following functionalities: 
  - Search new recipes with many filters. By dish name, by ingredients (what is left on your fridge?) or by nutritional values.
  - See similar recipes to the ones you are seeing.
  - Add them to favourites. In your account, you will find all these recipes, you can edit or delete them, or even add new ones.
  - The apps helps you to guess the nutritional values of your new recipe if you don't know them. 
  - Add recipes to your week planner. Drag and drop them in the day you want to make changes!
  - It will automatically generate a shopping list with your week planner. You can delete the ingredients you already have at home!
  - You can also have sugestions based on your interests. Fill them in your profile!

## Technologies
  - HTML5
  - Sass
  - Javascript ES6
  - Node JS
  - Express JS
  - Mongo DB
  
## Demo video 
[Open](https://www.linkedin.com/posts/laura-del-toro-sosa_this-week-i-delivered-my-second-project-at-activity-6688063885766889472-w04G)
## Launch

- You can see the app in https://foodies-app-ironhack.herokuapp.com/

## Endpoints

| Method 	| Endpoint                                 	| Description                                                                        	|
|--------	|------------------------------------------	|------------------------------------------------------------------------------------	|
| GET    	| /recipes                                 	| Renders the main recipe search bar.                                                	|
| GET    	| /recipes/search-by-ingredients           	| Renders the ingredients recipe search bar.                                         	|
| POST   	| /recipes/search-by-ingredients           	| Shows a list of recipes according to the ingredients search.                       	|
| GET    	| /recipes/search-by-nutrients             	| Renders the nutrients recipe search bar.                                           	|
| POST   	| /recipes/search-by-nutrients             	| Shows a list of recipes according to the nutrients search.                         	|
| POST   	| /recipes/add-to-favourites/:recipeID     	| Adds a new recipe to the user's profile.                                           	|
| GET    	| /recipes/details/:recipeID               	| Show details about a certain recipe.                                               	|
| GET    	| /profile/recommendation                  	| Generates a suggested recipe for the user depending on his/her diet and interests. 	|
| GET    	| profile/edit/:userID                     	| Renders a form to edit the user's profile.                                         	|
| POST   	| profile/edit/:userID                     	| Changes the user profile.                                                          	|
| GET    	| profile/:userID                          	| Shows the user's profile.                                                          	|
| PUT    	| profile/my-week/change-day               	| Change the day of week-meals.                                                      	|
| DELETE 	| profile/my-week/delete                   	| Deletes a meal from the current week plan.                                         	|
| GET    	| profile/my-week/:userID                  	| Shows the user's meal planner.                                                     	|
| DELETE 	| profile/my-shopping-list/delete          	| Deletes ingredients from the shopping list.                                        	|
| GET    	| profile/my-shopping-list/:userID         	| Shows the user's shopping list.                                                    	|
| GET    	| profile/my-recipes/:userID/add           	| Renders a form to create a new recipe manually by the user.                        	|
| POST   	| profile/my-recipes/:userID/add           	| Creates a user's new recipe.                                                       	|
| GET    	| profile/my-recipes/:recipeID             	| Shows details of an user's recipe.                                                 	|
| GET    	| profile/my-recipes/edit/:recipeID        	| Shows a form to edit an existing recipe.                                           	|
| POST   	| profile/my-recipes/edit/:recipeID        	| Edits an existing recipe.                                                          	|
| DELETE 	| profile/my-recipes/delete/:recipeID      	| Deletes a recipe from the user's profile.                                          	|
| POST   	| profile/my-recipes/add-to-week/:recipeID 	| Adds to the week planner a recipe                                                  	|
| GET    	| profile/my-recipes/:userID               	| Renders the user's recipes                                                         	|
| GET    	| /auth/signup                             	| Shows a form to sign up                                                            	|
| POST   	| /auth/signup                             	| Generates a new user                                                               	|
| GET    	| /auth/login                              	| Shows a form to log in                                                             	|
| POST   	| /auth/login                              	| Starts a new session for the user                                                  	|
| GET    	| /auth/logout                             	| Ends the current session                                                           	|

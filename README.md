# _Foodies App

_foodies App is a Desktop Web Application for cooking and meal planning. It has the following functionalities: 
  - Search new recipes with many filters. By dish name, by ingredients (what is left on your fridge?) or by nutritional values.
  - See similar recipes to the ones you are seeing.
  - Add them to favourites. In your account, you will find all these recipes, you can edit or delete them, or even add new ones.
  - The apps helps you to guess the nutritional values of your new recipe if you don't know them. 
  - Add recipes to your week planner. Drag and drop them in the day you want to make changes!
  - It will automatically generate a shopping list with your week planner. You can delete the ingredients you already have at home!
  - You can also have sugestions based on your interests. Fill them in your profile!

## Run

- You can see the app in https://foodies-app-ironhack.herokuapp.com/

## Endpoints

| Method  	    | Path  	|  Description 	|
|---	|---	|---	|
|GET  	| /  	| Goes to the main  page  	|
| GET  	| /auth/signup  	| Shows the form to sign up 	|
| POST  	|  /auth/signup 	| Saves the user in the DDBB  	|
| GET  	| auth/login  	| Shows the form to log in  	|
| POST  	|  auth/login 	| Starts a new session of the user  	|
| GET  	| auth/logout  	| Ends the current session  	|
| GET  	| /profile/:id 	| Redirect the current user to his/her profile  	|
| GET  	| /profile/my-recipes/:userID  	| Shows the recipes saved by the user  	|
| GET  	| /profile/my-recipes/:userID/add  	|  Shows a form to add a new recipe 	|
|  POST 	|   /profile/my-recipes/:userID/add 	|  Creates a new recipe 	|
| GET  	|  /profile/my-recipes/:userID/edit/:recipeID 	| Shows a form to edit an existing recipe|
| POST  	|  /profile/my-recipes/:userID/edit/:recipeID  	| Edits an existing recipe  	|
| POST  	| /profile/my-recipes/:userID/delete/:recipeID  	|  Deletes a recipe 	|
| GET  	| /profile/my-recipes/:userID/details/:recipeID  	| Shows details of the current recipe  	|
|GET   	|/profile/my-week/:userID   	| Shows the user week planner  	|
| GET|/recipes | Shows the form to make a new recipe search|
|POST |/recipes | Shows the results of the recipe search |
| POST|/recipes/add-to-favourites/:recipeID |Adds the recipe to the user recipes |
| GET|/profile/:userID/shopping-list-delete |Deletes an item from the user's shopping list |
|GET |/profile/:userID/shopping-list | Shows the user shopping list | 
| POST|/profile/:userID/shopping-list/add |Adds item to the user shopping list |

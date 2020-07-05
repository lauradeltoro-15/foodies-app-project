# Express generator

Boilerplate for a basic ExpressJS backend

## Install

- Run `npm i` on the root directory

## Run

- Create a `.env` file on the root directory to populate the database (`DB`) and port (`PORT`)
- Run `npm run dev` command on the root directory


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
| GET  	| //profile/my-recipes/:userID/details/:recipeID  	| Shows details of the current recipe  	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|
|   	|   	|   	|

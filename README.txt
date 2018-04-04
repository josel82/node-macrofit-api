API URL: https://young-spire-16181.herokuapp.comUser RoutesMethod: POSTStatus: PublicRoute: https://young-spire-16181.herokuapp.com/usersDescription: This route is for signing up a new userRequirements:• It requires a JSON object within the request body. This JSON object must contain the following properties:{	“Email”    : “myemail@example.com”,	“password” : “password1234”}Response: if successful it should return the new user with user id and token in JSON format, with a 200 statusMethod: POSTStatus: PublicRoute: https://young-spire-16181.herokuapp.com/users/loginDescription: This route is for logging in a userRequirements:• It requires a JSON object within the request body. This JSON object must contain the following properties:{	“Email”    : “myemail@example.com”,	“password” : “password1234”}Response: if successful it should return the user with user id and token in JSON format, with a 200 status.Method: DELETEStatus: PrivateRoute: https://young-spire-16181.herokuapp.com/users/me/tokenDescription: This route is for logging out a user.Requirements:• It requires authentication via “x-auth” header. This should contain a valid token in order for this route to work.Response: if successful it should delete the token from the database, so it would no longer be valid, returning a 200 status.Entry RoutesMethod: POSTStatus: PrivateRoute: https://young-spire-16181.herokuapp.com/entriesDescription: This route is for saving a new entry to the databaseRequirements:• It requires authentication via “x-auth” header. This should contain a valid token in order for this route to work.• It requires a JSON object within the request body. This JSON object must contain the following properties:{	“title”       : “My Title”,	“gender”      : “male”,	“age”         : “30”,	“weight”      : “85”,	“height”      : “182”,	“activityMult”: “.85”,	“goal”        : “1”,	“isImperial”  : “false”}Response: if successful it should return the entry just saved in JSON format, with a 200 status.Method: GETStatus: PrivateRoute: https://young-spire-16181.herokuapp.com/entriesDescription: This route retrieves all the entries of a specified routeRequirements:• It requires authentication via “x-auth” header. This should contain a valid token in order for this route to work.Response: if successful it should return all the entries of the authenticated user in JSON format, with a 200 status.Method: DELETEStatus: PrivateRoute: https://young-spire-16181.herokuapp.com/entries/:idDescription: This route is for deleting a specified entry. The entry id is passed as a parameter.Requirements:• It requires authentication via “x-auth” header. This should contain a valid token in order for this route to work.• It requires the Entry id as a parameterResponse: if successful it should delete the specified entry and return it in JSON format, with a 200 status.Method: PATCHStatus: PrivateRoute: https://young-spire-16181.herokuapp.com/entries/:idDescription: This route is for editing a specified entry. The entry id is passed as a parameter.Requirements:• It requires authentication via “x-auth” header. This should contain a valid token in order for this route to work.• It requires the Entry id as a parameterResponse: if successful it should edit the specified entry and return it in JSON format, with a 200 status.Entry RoutesMethod: GETStatus: PublicRoute: https://young-spire-16181.herokuapp.com/test/entriesDescription: This route retrieves all the entries in the databaseRequirements: noneResponse: if successful it should return all the entries saved in the database in JSON format, with a 200 status.Method: GETStatus: PublicRoute: URL/test/entries/idDescription: This route retrieves a specified entry. Requirements: • Must provide the entry id as a parameter.Response: if successful it should return the specified entry with a 200 status.


USER ROUTES

SIGN UP ROUTE
status: Public
method: POST
path: /users
Description: Signs up a new user.
Request:
•	headers:  Content-Type: application/json
•	body: {
		"email":"example@email.com",
		"password": "passwordMorethan6char"
	}
Response:
•	Status: 200
•	headers:  x-auth: "token"
•	body: {
		"_id":"wefsafhraskfhq785y53t31r4r",
		"email": " example@email.com "
	}
Errors:
•	Status: 400
•	error: { type: "password", message: "Minimum allowed 6 characters"}
•	error: { type: "email", message: "Invalid Email"}
•	error: { type: "account", message: " User is already registered."}
•	Whole error object in case none of another type of error occurs.



LOG IN ROUTE
status: Public
method: POST
path: /users/login
Description: Logs in an existing user.
Request:
•	headers:  Content-Type: application/json
•	body: {
		"email":"example@email.com",
		"password": "passwordMorethan6char"
	}

Response:
•	Status: 200
•	headers:  x-auth: "token"
•	body: {
		"_id":"wefsafhraskfhq785y53t31r4r",
		"email": " example@email.com "
	}
Errors:
•	Status: 400
•	error: { type: "auth", message: " Email or password incorrect."}



LOG OUT ROUTE
status: Private
method: DELETE
path: /users/me/token
Description: Logs out an user.
Request:
•	headers:  x-auth: "token"
Response:
•	Status: 200
•	empty body.

Errors:
•	Status: 400
•	error: { type: "credentials", message: " Invalid credentials."}



ENTRY ROUTES

SAVE A NEW ENTRY
status: Private
method: POST
path: /entries
Description: Saves a new entry in the database.
Request:
•	headers:  Content-Type: application/json
		     x-auth: "token"
•	body: {
		"title":"sometitle",
		"gender": "0",
		"age":"30",
		"weight": "60",
		"height": "167",
		"activityMult":"1.55",
		"goalMult":"1",
		"isImperial":"false"
	}

Response:
•	Status: 200
•	body: {
   	 	"_userId": "5aa26162d79b5c0014282430",
    	"title": "sometitle",
    	"gender": 0,
    	"age": 30,
   		"weight": 60,
   	 	"height": 167,
    	"activityMult": 1.55,
   		"goalMult": 1,
"isImperial": false,
    	"createdAt": "1521651117407",
   		"updatedAt": "1521651117407",
    	"_id": "5ab28dad8bfef2001437acd4",
   		"__v": 0
}

Errors:
•	Status: 400
•	Empty body
•	Cause: Sent body with the wrong schema.
•	Status: 401
•	Empty body
•	Cause: Invalid token.
GET ENTRIES
status: Private
method: GET
path: /entries
Description: Retrieves all the entries of an specific user.
Request:
•	headers:  Content-Type: application/json
		     x-auth: "token"

Response:
•	Status: 200
•	body: {
    "entries": [
        {
            "isImperial": false,
            "_id": "5aa26219d79b5c0014282433",
            "_userId": "5aa26162d79b5c0014282430",
            "title": "sometitle",
            "gender": 0,
            "age": 30,
            "weight": 60,
            "height": 167,
            "activityMult": 1.55,
            "goal": 1,
            "createdAt": "1520591385864",
            "updatedAt": "1520591385864",
            "__v": 0
        },
	...
    ]
}

Errors:
•	Status: 400
•	Empty body
•	Cause: Bad request.
•	Status: 401
•	Empty body
•	Cause: Invalid token.
•	Status: 404
•	Empty body
•	Cause: Couldn’t find any entries.



EDIT ENTRY
status: Private
method: PATCH
path: /entries/:id
Description: Edit an existing entry.
Request:
•	headers:  Content-Type: application/json
		     x-auth: "token"
•	body: {
		"title":"changed title",
		"gender": "0",
		"age":"32",
		"weight": "60",
		"height": "167",
		"activityMult":"1.55",
		"goalMult":"1",
		"isImperial":"false"
	}

Response:
•	Status: 200
•	body: {
    "result": {
        "isImperial": false,
        "_id": "5ab28dad8bfef2001437acd4",
        "_userId": "5aa26162d79b5c0014282430",
        "title": "changed title",
        "gender": 0,
        "age": 30,
        "weight": 60,
        "height": 167,
        "activityMult": 1.55,
        "goalMult": 1,
        "createdAt": "1521651117407",
        "updatedAt": "1521651470662",
        "__v": 0
    }
}

Errors:
•	Status: 400
•	Empty body
•	Cause: Sent body with the wrong schema.
•	Status: 401
•	Empty body
•	Cause: Invalid token.
•	Status: 404
•	Empty body
•	Cause: Entry could not be found.


DELETE ENTRY
status: Private
method: DELETE
path: /entries/:id
Description: Deletes an existing entry.
Request:
•	headers:  Content-Type: application/json
		     x-auth: "token"

Response:
•	Status: 200
•	body {
    "result": {
        "isImperial": false,
        "_id": "5ab28dad8bfef2001437acd4",
        "_userId": "5aa26162d79b5c0014282430",
        "title": "changed title",
        "gender": 0,
        "age": 30,
        "weight": 60,
        "height": 167,
        "activityMult": 1.55,
        "goalMult": 1,
        "createdAt": "1521651117407",
        "updatedAt": "1521651470662",
        "__v": 0
    }
}
Errors:
•	Status: 400
•	Empty body
•	Cause: Bad request.
•	Status: 401
•	Empty body
•	Cause: Invalid token.
•	Status: 404
•	Empty body
•	Cause: Entry could not be found.

## USER ROUTES

### SIGN UP ROUTE
#### Public route
#### Method: POST
#### Path: /users
#### Description: Signs up a new user.
#### Request:
```
	headers:  Content-Type: application/json
	body: {
		"email":"example@email.com",
		"password": "passwordMorethan6char"
	}	
```

#### Response:
```
	status: 200
  headers:  x-auth: "token"
  body: {
		"_id":"wefsafhraskfhq785y53t31r4r",
		"email": " example@email.com "
	}
```
#### Errors:
```
	Status: 400
	error: { type: "password", message: "Minimum allowed 6 characters"}
	error: { type: "email", message: "Invalid Email"}
	error: { type: "account", message: " User is already registered."}
	Whole error object in case none of another type of error occurs.
```
<br>

---

### LOG IN ROUTE
#### Public route
#### Method: POST
#### Path: /users/login
#### Description: Logs in an existing user.
#### Request:
```
  headers:  Content-Type: application/json
	body: {
		"email":"example@email.com",
		"password": "passwordMorethan6char"
	}
```

#### Response:
```
	Status: 200
	headers:  x-auth: "token"
	body: {
		"_id":"wefsafhraskfhq785y53t31r4r",
		"email": " example@email.com "
	}
```
#### Errors:
```
Status: 400
error: { type: "auth", message: " Email or password incorrect."}
```
<br>

---



### LOG OUT ROUTE
#### Private route
#### Method: DELETE
#### Path: /users/me/token
#### Description: Logs out an user.
#### Request:
```
headers:  x-auth: "token"
```
#### Response:
```
	Status: 200
	empty body.
```

#### Errors:
```
	Status: 400
	error: { type: "credentials", message: " Invalid credentials."}
```

<br>

---


## ENTRY ROUTES

### SAVE A NEW ENTRY
#### Private route
#### Method: POST
#### Path: /entries
#### Description: Saves a new entry in the database.
#### Request:
#### headers:  Content-Type: application/json
```
 x-auth: "token"
 body: {
		"title":"sometitle",
		"gender": "0",
		"age":"30",
		"weight": "60",
		"height": "167",
		"activityMult":"1.55",
		"goalMult":"1",
		"isImperial":"false"
	}
```


#### Response:
```
Status: 200
	body: {
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
```

#### Errors:
```
	Status: 400   
	Empty body
	Cause: Sent body with the wrong schema.
	Status: 401
	Empty body
	Cause: Invalid token.
```
### GET ENTRIES
#### Private route
#### Method: GET
#### Path: /entries
#### Description: Retrieves all the entries of an specific user.
#### Request:
```
	      headers:  Content-Type: application/json
		    x-auth: "token"
```

#### Response:
```
	Status: 200
	body: {
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

```
#### Errors:
```
Status: 400   
Empty body
Cause: Bad request.
Status: 401
Empty body
Cause: Invalid token.
Status: 404
Empty body
Cause: Couldn’t find any entries.
```
<br>

---

### EDIT ENTRY
#### Private route
#### Method: PATCH
#### Path: /entries/:id
#### Description: Edit an existing entry.
#### Request:
```
	headers:  Content-Type: application/json
		     x-auth: "token"
	body: {
		"title":"changed title",
		"gender": "0",
		"age":"32",
		"weight": "60",
		"height": "167",
		"activityMult":"1.55",
		"goalMult":"1",
		"isImperial":"false"
	}
```

#### Response:
```
	Status: 200
	body: {
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
```

#### Errors:
```
	Status: 400   
	Empty body
	Cause: Sent body with the wrong schema.
	Status: 401
	Empty body
	Cause: Invalid token.
	Status: 404
	Empty body
	Cause: Entry could not be found.
```
<br>

---

### DELETE ENTRY
#### Private
#### Method: DELETE
#### Path: /entries/:id
#### Description: Deletes an existing entry.
#### Request:
```
	      headers:  Content-Type: application/json
		    x-auth: "token"

```
#### Response:
```
	Status: 200
	body {
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
```
#### Errors:
```
	Status: 400   
	Empty body
	Cause: Bad request.
	Status: 401
	Empty body
	Cause: Invalid token.
	Status: 404
	Empty body
	Cause: Entry could not be found.

```

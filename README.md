StudentScoreServer
===

API server for the project [StudentScoreWebApp](https://github.com) written with Express, Javascript. 
The database for this project is `MySQL`

# Run the project

create `.env` file with the following variables
- `PORT` (server port)
- `DATABASE_NAME` eg. studentscore.
- `DATABASE_PORT`
- `DATABASE_HOST`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `ACCESS_TOKEN` (your access token)

run the following commands
```
$ npm i
$ npm start
```

## All endpoints


### User endpoints
- [GET /user/tokenIsValid](#get-usertokenisvalid)
- [GET /user/getUsers](#get-usergetusers)
- [GET /user/signup](#get-usersignup)
- [POST /user/login](#post-userlogin)

### Student endpoints

- [GET /student/getStudents](#get-studentgetstudents)
- [POST /student/addStudent](#post-studentaddstudent)
- [PATCH /student/updateStudent](#patch-studentupdatestudent)
- [DELETE /student/deleteStudent/{student_id}](#patch-studentdeletestudentstudent_id)

### Score endpoints

- [GET /score/getScores](#get-scoregetscores)
- [GET /score/getScoreById/{student_id}](#get-scoregetscorebyidstudent_id)
- [POST /score/addScore](#post-scoreaddscore)
- [PATCH /score/updateScore](#patch-scoreupdatescore)
- [DELETE /score/delete/{student_id}](#patch-scoredeletestudent_id)


## GET /user/tokenIsValid

Check if the web token is valid or not.


#### Response:
```
{
    "status": "valid"
}
```

## GET /user/getUsers

Get list of all users.


#### Response:
```
[
    {
        "id": 1,
        "username": "Riley",
        "email": "riley@email.com",
        "status": "active"
    },
    {
        "id": 2,
        "username": "Michael",
        "email": "michael@email.com",
        "status": "active"
    }
]
```

## GET /user/signup

Add new user.

#### Body:
- `username` **string**
- `email` **string**
- `password` **string**
- `status` **string**: only `active`, `inactive`

#### Response:
```
{ 
    message: "Register Successfully!!" 
}
```

## POST /user/login

login user.

#### Body:
- `email` **string**
- `password` **string**

#### Response:
```
[
    {
        "first_name": "Michel",
        "score": 95.5
    }
]
```


## GET /student/getStudents

Get list of all students.

### Response

```
[
    {
        "id": 1,
        "first_name": "Michael",
        "last_name": "Shimmer",
        "nick_name": "Mike",
        "status": "active"
    },
    {
        "id": 2,
        "first_name": "Robin",
        "last_name": "Chord",
        "nick_name": "Rob",
        "status": "active"
    }
]
```




## POST /student/addStudent

Add new student to the database, one student at a time.

#### Body:
- `first_name` **string**
- `last_name` **string**
- `nick_name` **string**

#### Response:
```
{
    "message": "Add the new student successfully",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 2,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```


## PATCH /student/updateStudent

Update specified student's first name, last name and nick name.

#### Body:
- `id` **number** id of the student to update.
- `first_name` **string**
- `last_name` **string**
- `nick_name` **string**

#### Response:
```
{
    "message": "Update student successfully!",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```

## DELETE /student/deleteStudent/{student_id}

Delete the specified student

#### Query:
- `student_id` **number** id of the student to update.

#### Response:
```
{
    "message": "studentScore deleted sucessfully!",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

## GET /score/getScores

Get list of student's score.


#### Response:
```
[
    {
        "first_name": "Michael",
        "score": 95.5
    },
    {
        "first_name": "Robin",
        "score": 85.5
    }
]
```


## GET /score/getScoreById/{student_id}

Get the spcific student's score.

#### Query:
- `student_id` **number** the student's id to get the informations.

#### Response:
```
{
    "first_name": "Michael",
    "score": 95.5
}
```


## POST /score/addScore

Add new student's score.

#### Body:
- `student_id` **number** new student's id.
- `score` **float**

#### Response:
```
{
    "message": "Add new student's score successfully",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

## PATCH /score/updateScore

Update the student's score.

#### Body:
- `student_id` **number** student's id.
- `score` **float**

#### Response:
```
{
    "message": "Update student's score successfully!",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```

## DELETE /score/delete/{student_id}

Delete the student's score.

#### Query:
- `student_id` **number** student's id to delete.

#### Response:
```
{
    "message": "studentScore deleted sucessfully!",
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
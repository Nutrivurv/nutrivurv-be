# Nutrivurv API Documentation

----

## Auth

**URI** `/api/auth`


| Method | URI         | Description         |
| ------ | ----------- | ------------------- |
| `POST` | `/login`    | `Authenticate User` |
| `POST` | `/register` | `Register User`     |

---

### `POST` - `/api/auth/login`

- **Data Constraints**

  ```
  {
    email: "[valid email address]"
    password: "[password in plain text]"
  }
  ```

* **Data Example**

  ```
  {
    email: "john.smith@gmail.com
    password: "password"
  }
  ```

* **Success Response:**
  
  * **Code:** 200 - OK<br />
    * **Example**
      ```
      {
          message: "User Authenticated",
          token: "[json web token]",
          user: {
              "id": 1,
              "name": "John Smith",
              "email": "john.smith@gmail.com"
          }
      }
      ```
* **Error Response:**
  * **Code:** 401 - UNAUTHORIZED<br />
    * **Examples**
      ```
      {
        message: "Invalid password provided"
      }
      ```
      ```
      {
        message: "No account associated with john.smith@gmail.com"
      }
      ```
  * **Code:** 400 - BAD REQUEST<br />
    * **Example**
      ```
      {
        "message": "Missing credentials"
      }
      ```
  * **Code:** 500 - INTERNAL SERVER ERROR<br />
    * **Example**
      ```
      {
        "message": "Internal Server Error"
      }
      ```
---

### `POST` - `/api/auth/register`

- **Data Constraints**
  ```
  {
    name: "[user's name]"
    email: "[valid email address]"
    password: "[password in plain text]"
  }
  ```

* **Data Example**
  ```
  {
    name: "John Smith"
    email: "john.smith@gmail.com
    password: "password"
  }
  ```

* **Success Response:**

  * **Code:** 201 - CREATED<br />
    * **Example**
      ```
      {
        "message": "john.smith@gmail.com has been registered.",
        "token": "[json web token]",
        "newUser": {
            "id": 1,
            "name": "John Smith",
            "email": "john.smith@gmail.com"
        }
      }
      ```
* **Error Response:**
  * **Code:** 409 - CONFLICT<br />
      **Example**
      ```
      {
          message: "Account with email john.smith@gmail.com is already exists"
      }
      ```
  * **Code:** 400 BAD REQUEST<br />
      **Example**
      ```
      {
        "message": "Missing credentials"
      }
      ```
  * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Example**
      ```
      {
        "message": "Internal Server Error"
      }
      ```


### GET all entries for a specific user and specific date

/api/user/<user.id>/<entry.date>/

Must be logged in

Returns entry array

Ex: 

```json
{
    "entry": [
        {
            "name": "Test",
            "id": 1,
            "user_id": 1,
            "date": "2020-07-24T05:00:00.000Z",
            "meal_type": "breakfast",
            "edamam_food_id": "3",
            "measurement_uri": "measurement_uri",
            "measurement_name": "measurement_name",
            "food_name": "food_name",
            "quantity": 2,
            "calories_kcal": 2,
            "fat_g": "0.50",
            "carbs_g": "0.50",
            "protein_g": "0.50"
        },
        {
            "name": "Test2",
            "id": 2,
            "user_id": 1,
            "date": "2020-07-24T05:00:00.000Z",
            "meal_type": "dinner",
            "edamam_food_id": "3",
            "measurement_uri": "measurement_uri",
            "measurement_name": "measurement_name",
            "food_name": "food_name",
            "quantity": 2,
            "calories_kcal": 2,
            "fat_g": "0.50",
            "carbs_g": "0.50",
            "protein_g": "0.50"
        }
    ]
}
```


### POST a new log entry

/api/user/<user.id>/

Must be logged in

Must provide: 

- valid user_id
- date
- edamam_food_id
- measurement_uri
- measurement_name
- food_name
- quantity
- calories_kcal
- fat_g
- carbs_g
- protein_g
- meal_type -
    Options:
    * breakfast
    * lunch
    * snack
    * dinner 
    * water

Returns a new entry

Ex: 

```json
[
    {
        "id": 3,
        "user_id": 1,
        "date": "2020-07-24T05:00:00.000Z",
        "meal_type": "snack",
        "edamam_food_id": "3",
        "measurement_uri": "measurement_uri",
        "measurement_name": "measurement_name",
        "food_name": "food_name",
        "quantity": 2,
        "calories_kcal": 2,
        "fat_g": "0.50",
        "carbs_g": "0.50",
        "protein_g": "0.50"
    }     
]
```


### Put (update) an entry

/api/user/<user.id>/<log_entry.id>

Must be logged in

Required: 

- valid user id
- valid log_entry id

Returns the following: 

```json
{
    "updated": 1
}
```

### Delete an entry

/api/user/<user.id>/<log_entry.id>

Must be logged in

Required: 

- valid user id
- valid log_entry id

Returns the following: 

```json
{
    "removed": 1
}
```


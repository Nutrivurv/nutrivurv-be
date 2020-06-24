#Nutrivurv API Documentation

----

##Auth

**URI**

  `/api/auth`


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
    * **Examples**
    * ```
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
    * ```
      {
        message: "Invalid password provided"
      }
      ```
    * ```
      {
        message: "No account associated with john.smith@gmail.com"
      }
      ```
  * **Code:** 400 - BAD REQUEST<br />
    * **Examples**
    * ```
      {
        "message": "Missing credential."
      }
      ```
  * **Code:** 500 - INTERNAL SERVER ERROR<br />
    * **Examples**
    * ```
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
    * **Examples**
    * ```
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
    * **Example**
      ```
      {
          message: "Account with email john.smith@gmail.com is already exists"
      }
      ```
  * **Code:** 400 BAD REQUEST<br />
    * **Example**
      ```
      {
        "message": "Missing credentials"
      }
      ```
  * **Code:** 500 Internal Server Error<br />
    * **Example**
      ```
      {
        "message": "Internal Server Error"
      }
      ```
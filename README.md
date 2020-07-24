# Nutrivurv

[![Maintainability](https://api.codeclimate.com/v1/badges/9ac982aab59ee2c30f71/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/nutrition-tracker-be-pt7/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9ac982aab59ee2c30f71/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/nutrition-tracker-be-pt7/test_coverage)

## Backend deployed to [Heroku](https://nutrivurv-be.herokuapp.com/)

### [Nutrivurv API Documentation](./docs/api_documentation.md)

## Getting started

Running the server locally:

1. Clone this repo.
2. `npm install` or `yarn install` to install all required dependencies
3. Create a PostgreSQL database [locally](https://www.postgresqltutorial.com/install-postgresql/) or one on [Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1).

4. Create .env file with environment variables.
    ```
    DEV_DATABASE_URL=<address of your PostgreSQL database for development>
    TEST_DATABASE_URL=<address of your PostgreSQL database to run tests against>
    JWT_SECRET=<sequence of characters used to sign web tokens>
    ```
5. Run `knex migrate:latest` to create the database tables
6. Run `seed:run` to seed data into the database.

### Commands

- `npm start` to start the server with node.

- `npm run dev` to start the local server using nodemon.

- `npm test` to start server using testing environment.

- `npm run coverage` to get test coverage.

- `npm run lint` to run linter and return linting errors.

- `npm run lint:fix` to run linter and fix linting errors.

- `npm run format` to format code with prettier

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/nutrition-tracker-fe-pt7/blob/master/README.md) for details on the frontend of our project.

See [iOS Documentation](https://github.com/Lambda-School-Labs/nutrition-tracker-ios-pt7/blob/master/README.md) for details on the iOS implementation of our project.

Please read through the [Code of Conduct](./docs/code_of_conduct.md) and [Contributing Guidelines](./docs/contributing.md) before contributing to this repo.



# GET all entries for a specific user and specific date

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


# POST a new log entry

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


# Put (update) an entry

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

# Delete an entry

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



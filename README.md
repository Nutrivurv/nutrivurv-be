
![Code Maintainability](https://api.codeclimate.com/v1/badges/9ac982aab59ee2c30f71/maintainability)

![Test Coverage](https://api.codeclimate.com/v1/badges/9ac982aab59ee2c30f71/test_coverage)

  

# API Documentation

  

## Backend deployed at [Heroku](https://labspt7-nutrition-tracker-be.herokuapp.com/)

  

## Getting started

  

To get the server running locally:

  

- Clone this repo.

- Install [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).

- Install [Prisma](https://www.npmjs.com/package/prisma) globally.

- Spin up a local virtual machine using Docker Toolbox.

- Deploy Prisma to your local Docker image.

- Get the current schema from Prisma.

- **yarn install** to install all required dependencies

- **yarn dev** to start the local server

- **yarn test** to start server using testing environment

- `yarn lint` to run linter

- `yarn lint:fix` to run linter and fix linting errors

- `yarn format` to run prettier and format code

### Backend framework goes here

  

- We are using PostgreSQL as our database to comply with engineering standards documentation and because it is one of the most full featured open source DB platforms.

- We are going to use Apollo and Prisma to integrate GraphQL into Node.js.

- We will interact with our API by using GraphQL. We have determined in order to simplify and minimize the amount of data exchanged, GraphQL will provide us with a faster, more professional result.

  

## Endpoints

  

Our server utilizes GraphQL as opposed to a RESTful array of endpoints, which only supports one endpoint, a post to the application itself. Full documentation of our endpoints can be found on the application, courtesy of GraphQL playground. Follow the link and click "Docs" along the right side of the screen.

[GraphQL Playground Docs](https://labspt7-nutrition-tracker-be.herokuapp.com/)

  

## Data Model

  

Our server utilizes GraphQL as opposed to a RESTful array of endpoints, which only supports one endpoint, a post to the application itself. Full documentation of our endpoints can be found on the application, courtesy of GraphQL playground. Follow the link and click "Docs" along the right side of the screen.

[GraphQL Playground Docs](https://labspt7-nutrition-tracker-be.herokuapp.com/)

  

## Actions

  

Our server utilizes GraphQL as opposed to a RESTful array of endpoints, which only supports one endpoint, a post to the application itself. Full documentation of our endpoints can be found on the application, courtesy of GraphQL playground. Follow the link and click "Docs" along the right side of the screen.

[GraphQL Playground Docs](https://labspt7-nutrition-tracker-be.herokuapp.com/)

  

## Environment Variables

  

In order for the app to function correctly, the user must set up their own environment variables.

  

create a .env file that includes the following:

  

- PRISMA_ENDPOINT - Endpoint to the prisma application hosted on prisma cloud

- PRISMA_SECRET - Must match the secret string passed to prisma

- JWT_SECRET - Must match the secret on the server

- DB_HOST - The postgres database connection information

- DB_NAME - The postgres database connection information

- DB_USER - The postgres database connection information

- DB_USER - The postgres database connection information

  

## Contributing

  

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

  

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

  

### Issue/Bug Request

  

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

  

- Check first to see if your issue has already been reported.

- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.

- Create a live example of the problem.

- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

  

### Feature Requests

  

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

  

### Pull Requests

  

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

  

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

  

#### Pull Request Guidelines

  

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.

- Ensure that your code conforms to our existing code conventions and test coverage.

- Ensure that your code coforms to code style guide lines by linting your code.


- Include the relevant issue number, if applicable.

- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

  

### Attribution

  

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

  

## Documentation

  

See [Frontend Documentation](https://github.com/Lambda-School-Labs/nutrition-tracker-fe-pt7/blob/master/README.md) for details on the frontend of our project.

  

See [iOS Documentation](https://github.com/Lambda-School-Labs/nutrition-tracker-ios-pt7/blob/master/README.md) for details on the iOS implementation of our project.

### How to add new content:

 - Add the model to /prisma/datamodel.graphql
 - run `prisma deploy` and `yarn get-schema`
 - Add the new type and inputs for create and delete to /schema.graphql
	 - follow the naming conventions used by prisma in order to keep all things aligned
- Add the names of the queries and mutations to the queries / mutations part at the top of the page, and what they return
- Create a new file in /resolvers/queries named after your model.
	- All queries relating to this model should go in this file
	- Repeat the same for /resolvers/mutations
- Import your file into /resolvers/Queries.js or Mutations.js and spread it into the exported object
	- If you have any fields on your datamodel returning a custom scalar field, you will also need custom resolvers for that field.
	- Create a file named after the model in /resolvers and write resolvers for the field
	- Import your file into /resolvers/index.js and add it to the `resolvers` object
- Abstract all business logic from your resolvers into external functions located in the /utils folder. Make sure you write unit tests for your business logic functions
const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("User test cases", () => {
  test("logging in works", async () => {
    const login = await MyServer.query(`mutation {
        login(data: { email: "testing@testing.com", password: "test1234" }) {
          token
          user {
            id
          }
        }
      }`);
    expect(login.data.login.token).toBeDefined();
  });

  test("can register an account", async () => {
    const create = await MyServer.query(`mutation {
      createUser(data: { email: "createUser@test.com", password: "test1234", name: "CreateUserTest" }) {
        token
        user {
          id
        }
      }
    }`);
    expect(create.data.createUser.token).toBeDefined();
  });

  test("can fetch a user by email", async () => {
    const find = await MyServer.query(`query {
      user(id: "ck6wzqjqj001p0716its05sv4") {
        name
      }
    }
    `);
    expect(find.data.user.name).toBe("Hello World");
  });

  test("can update user information", async () => {
    const change = await MyServer.query(`mutation {
      updateUser(
        data: { email: "testing@testing.com", password: "test1234", name: "Hello World" }
      ) {
        id
        name
      }
    }
    `);
    expect(change.data.updateUser.name).toBe("Hello World");
  });

  test("can delete a user", async () => {
    const del = await MyServer.query(`mutation {
      deleteUser {
        id
        name
      }
    }
    `);
    expect(del.data.deleteUser.id).toBeDefined();
  });
});

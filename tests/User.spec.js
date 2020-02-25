const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("User test cases", () => {
  test("logging in works", async () => {
    const result = await MyServer.query(`mutation {
        login(data: { email: "testing@testing.com", password: "test1234" }) {
          token
          user {
            id
          }
        }
      }`);
    expect(result.data.login.token).toBeDefined();
  });
});

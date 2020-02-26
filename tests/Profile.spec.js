const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("Profile test cases", () => {
  test("can create a profile", async () => {
    const create = await MyServer.query(`mutation {
        createProfile(data: { age: 1, weight: 1, height: 1, gender: true }) {
          id
        }
      }
      `);
    expect(create.data.createProfile.id).toBeDefined();
  });

  test("can update a profile", async () => {
    const update = await MyServer.query(`mutation {
        updateProfile(data: { age: 10, weight: 1, height: 1, gender: true }) {
          id
          age
        }
      }
      
      `);
    expect(update.data.updateProfile.age).not.toBeNaN();
  });

  test("can delete a profile", async () => {
    const del = await MyServer.query(`mutation {
        deleteProfile {
          id
        }
      }
      `);

    expect(del.data.deleteProfile.id).toBeDefined();
  });

  test("can view your own profile", async () => {
    const read = await MyServer.query(`query {
        myProfile{
          id
        }
      }`);
    expect(read.data.myProfile.id).toBeDefined();
  });
});

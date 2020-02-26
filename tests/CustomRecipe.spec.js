const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("CustomRecipe test cases", () => {
  test("can create custom recipe", async () => {
    const cook = await MyServer.query(`mutation {
        createCustomRecipe(data: { portions: 1, name: "Hello World" }) {
          name
        }
      }
      `);
    expect(cook.data.createCustomRecipe.name).toBe("Hello World");
  });

  test("can edit custom recipe", async () => {
    const switchup = await MyServer.query(`mutation {
        updateCustomRecipe(id: "string" data: { portions: 10, name: "basagna" }) {
          portions
        }
      }
      `);
    expect(switchup.data.updateCustomRecipe.portions).not.toBeNaN();
  });

  test("can delete custom recipe", async () => {
    const begone = await MyServer.query(`mutation {
        deleteCustomRecipe(id: "string") {
          name
        }
      }
      `);
    expect(begone.data.deleteCustomRecipe.name).toBeDefined();
  });

  test("can find your recipes", async () => {
    const yumlist = await MyServer.query(`query {
        myRecipes {
          id
          name
        }
      }
      `);
    expect(yumlist.data.myRecipes[0]).toBeTruthy();
  });
});

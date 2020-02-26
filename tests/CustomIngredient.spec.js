const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("CustomIngredient test cases", () => {
  test("can add a custom ingredient", async () => {
    const food = await MyServer.query(`mutation {
            createCustomIngredient(
              data: {
                name: "test"
                description: "test"
                fat: 1
                carbs: 1
                protein: 1
                fiber: 1
              }
            ) {
              id
            }
          }
          `);
    expect(food.data.createCustomIngredient.id).toBeDefined();
  });

  test("can change an ingredient", async () => {
    const different = await MyServer.query(`mutation {
        updateCustomIngredient( id: "string"
          data: {
            name: "test"
            description: "test"
            fat: 1
            carbs: 1
            protein: 1
            fiber: 10
          }
        ) {
          id
          fiber
        }
      }`);
    expect(different.data.updateCustomIngredient.fiber).not.toBeNaN();
  });

  test("can banish an ingredient from this realm", async () => {
    const banish = await MyServer.query(`mutation {
        deleteCustomIngredient(id: "string") {
          id
        }
      }
      `);
    expect(banish.data.deleteCustomIngredient.id).toBeDefined();
  });

  test("can find ingredients", async () => {
    const looky = await MyServer.query(`query {
        myIngredients {
          id
        }
      }
      `);
    expect(looky.data.myIngredients[0]).toBeTruthy();
  });
});

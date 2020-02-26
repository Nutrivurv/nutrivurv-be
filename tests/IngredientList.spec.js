const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("IngredientList test cases", () => {
  test("can make a new list", async () => {
    const pair = await MyServer.query(`mutation {
        createIngredientList(
          data: {
            recipe_id: "string"
            ingredient_id: "string"
            custom: true
            amount: 1
            unit: "string"
          }
        ) {
          id
        }
      }
      `);
    expect(pair.data.createIngredientList.id).toBeDefined();
  });

  test("can change list", async () => {
    const diff = await MyServer.query(`mutation {
      updateIngredientList(
          id: "string"
        data: {
          amount: 10
          unit: "string"
        }
      ) {
        id
        amount
      }
    }
    `);
    expect(diff.data.updateIngredientList.amount).not.toBeNaN();
  });

  test("can delete a list", async () => {
    const byebye = await MyServer.query(`mutation {
        deleteIngredientList(id: "string") {
          id
        }
      }
      `);
    expect(byebye.data.deleteIngredientList.id).toBeDefined();
  });
});

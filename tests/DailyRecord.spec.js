const fs = require("fs");
const { mockServer } = require("graphql-tools");
const schema = fs.readFileSync("./schema.graphql", "utf8");

const MyServer = mockServer(schema);

describe("DailyRecord test cases", () => {
  test("can create a dailyrecord", async () => {
    const create = await MyServer.query(`mutation {
            createDailyRecord(
              data: {
                date: "string"
                current_weight: 1
                calories: 1
                fat: 1
                carbs: 1
                fiber: 1
                protein: 1
                food_string: "string"
              }
            ) {
              id
            }
          }
          `);
    expect(create.data.createDailyRecord.id).toBeDefined();
  });

  test("can update a dailyrecord", async () => {
    const change = await MyServer.query(`mutation {
        updateDailyRecord(
            id: "string"
          data: {
            date: "string"
            current_weight: 1
            calories: 1
            fat: 1
            carbs: 1
            fiber: 1
            protein: 1
            food_string: "string"
          }
        ) {
          id
          date
        }
      }
      `);
    expect(change.data.updateDailyRecord.date).toBe("Hello World");
  });

  test("can delete a dailyrecord", async () => {
    const del = await MyServer.query(`mutation{
        deleteDailyRecord(id: "ck72qpf1100110710yntbvsm4"){
          id
        }
      }
      `);
    expect(del.data.deleteDailyRecord.id).toBeDefined();
  });

  test("can check for your dailyrecords", async () => {
    const mine = await MyServer.query(`query{
        myDailyRecords{
          id
        }
      }`);
    expect(mine.data.myDailyRecords[0]).toBeTruthy();
  });
});

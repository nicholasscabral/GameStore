const request = require("supertest");
const testDB = require("../database/connection");
const app = require("../app");

describe("Games", () => {
  beforeAll(async () => {
    await testDB.schema.createTable("catalog", async (table) => {
      table.increments();
      table.string("title");
      table.string("price");
      table.string("year");
      table.string("imgUrl");
    });
  });

  afterAll(async () => {
    await testDB.schema.dropTable("catalog");
  });

  it("should be able to create a new game", async () => {
    const response = await request(app).post("/game").send({
      title: "game Test",
      price: "100",
      year: "2014",
      imgUrl: "https://example.png",
    });

    expect(response.statusCode).toBe(201);
  });
});

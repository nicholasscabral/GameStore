const request = require("supertest");
const testDB = require("../database/connection");
const app = require("../app");

describe("Admins", () => {
  beforeAll(async () => {
    await testDB.schema.createTable("admin", (table) => {
      table.increments();
      table.string("username");
      table.string("email");
      table.string("password");
    });
  });

  afterAll(async () => {
    await testDB.schema.dropTable("admin");
  });

  it("should be able to create a new admin", async () => {
    const response = await request(app).post("/admin").send({
      username: "adminTest",
      email: "admin@example.com",
      password: "test123",
      passwordConfirm: "test123",
    });

    expect(response.statusCode).toBe(201);
  });

  it("shouldn't be able to create a new admin with an existing email", async () => {
    const response = await request(app).post("/admin").send({
      username: "adminTest",
      email: "admin@example.com",
      password: "test123",
      passwordConfirm: "test123",
    });

    expect(response.statusCode).toBe(400);
  });
});

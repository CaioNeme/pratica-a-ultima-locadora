import app from "app";
import supertest from "supertest";
import { cleanDb } from "../utils";
import { createFakeRental } from "../factories/rentals-factory";
import { createFakeMovie } from "../factories/movies-factory";
import { createFakeUser } from "../factories/users-factory";

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe("POST /rentals", () => {
  it("should create a new rental when provided with valid data", async () => {
    const user = await createFakeUser();
    const movie = await createFakeMovie();
    const rental = {
      userId: user.id,
      moviesId: [movie.id],
    };

    const response = await server
      .post("/rentals")
      .send(rental)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
  });

  it("should return error when user dont exist", async () => {
    const rentalInput = {
      userId: 1,
      moviesId: [1, 2, 3],
    };

    const response = await server
      .post("/rentals")
      .send(rentalInput)
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
  });

  it("should return a validation error when provided with invalid data", async () => {
    const invalidRentalInput = {
      moviesId: [1, 2, 3],
    };

    const response = await server
      .post("/rentals")
      .send(invalidRentalInput)
      .set("Accept", "application/json");

    expect(response.status).toBe(422);
  });
});

describe("POST /rentals/finish", () => {
  it("should validate a rental finish input object against the schema", async () => {
    const rental = await createFakeRental();

    const response = await server
      .post("/rentals/finish")
      .send({ rentalId: rental.id })
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("should return error when dont exist rental", async () => {
    const rentalFinishInput = {
      rentalId: 0,
    };

    const response = await server
      .post("/rentals/finish")
      .send(rentalFinishInput)
      .set("Accept", "application/json");

    expect(response.status).toBe(404);
  });

  it("should return a validation error when provided with invalid data", async () => {
    const invalidRentalFinishInput = {};

    const response = await server
      .post("/rentals/finish")
      .send(invalidRentalFinishInput)
      .set("Accept", "application/json");

    expect(response.status).toBe(422);
  });
});

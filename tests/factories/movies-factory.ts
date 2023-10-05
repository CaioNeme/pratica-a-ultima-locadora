import { faker } from "@faker-js/faker";
import prisma from "database";
import { Movie } from "@prisma/client";

export async function createFakeMovie(rentalId?: number) {
  const movie = await prisma.movie.create({
    data: {
      name: faker.lorem.sentence({ min: 1, max: 5 }),
      adultsOnly: faker.datatype.boolean(),
      rentalId: rentalId || null,
    },
  });

  return movie;
}

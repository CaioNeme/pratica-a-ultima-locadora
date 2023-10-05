import { faker } from "@faker-js/faker";
import { Movie } from "@prisma/client";
import prisma from "database";

export async function createFakeRental(userId?: number, movies?: Movie[]) {
  const rental = await prisma.rental.create({
    data: {
      date: faker.date.past(),
      endDate: faker.date.future(),
      closed: false,
      userId: userId || null,
    },
  });

  if (movies) {
    await prisma.rental.update({
      where: {
        id: rental.id,
      },
      data: {
        movies: {
          connect: movies.map((movie) => ({ id: movie.id })),
        },
      },
    });
  }

  return rental;
}

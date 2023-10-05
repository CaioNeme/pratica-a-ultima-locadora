import { faker } from "@faker-js/faker";
import prisma from "database";

export async function createFakeUser() {
  const user = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric(11),
      birthDate: faker.date.past(),
    },
  });
  return user;
}

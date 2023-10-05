import rentalsRepository from "repositories/rentals-repository";

describe("Rentals Service Unit Tests", () => {
  it("Should return all rentals", async () => {
    const rentalsOutput = {
      id: 1,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      closed: true,
    };
    jest
      .spyOn(rentalsRepository, "getRentals")
      .mockImplementationOnce((): any => {
        return {
          rentalsOutput,
        };
      });

    const rentals = await rentalsRepository.getRentals();
    expect(rentals).toEqual({ rentalsOutput });
  });

  it("Should return a rental by id", async () => {
    const rentalsOutput = {
      id: 1,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      closed: true,
    };

    jest
      .spyOn(rentalsRepository, "getRentalById")
      .mockImplementationOnce((): any => {
        return {
          rentalsOutput,
        };
      });

    const rentals = await rentalsRepository.getRentalById(1);
    expect(rentals).toEqual({ rentalsOutput });
  });

  it("Should return a rental by user id", async () => {
    const rentalsOutput = {
      id: 1,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      closed: true,
    };

    jest
      .spyOn(rentalsRepository, "getRentalsByUserId")
      .mockImplementationOnce((): any => {
        return {
          rentalsOutput,
        };
      });

    const rentals = await rentalsRepository.getRentalsByUserId(1);
    expect(rentals).toEqual({ rentalsOutput });
  });

  it("Should create a new rental", async () => {
    const rentalsInput = {
      id: 1,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      closed: true,
    };
    const test = { userId: 1, moviesId: [1, 2, 3] };

    jest
      .spyOn(rentalsRepository, "createRental")
      .mockImplementationOnce((): any => {
        return {
          rentalsInput,
        };
      });

    const rental = await rentalsRepository.createRental(test);
    expect(rental).toEqual({ rentalsInput });
  });

  it("Should finish a rental and disconnect movies", async () => {
    const rentalId = 1;
    const rentalsOutput = {
      id: 1,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      closed: true,
    };

    jest
      .spyOn(rentalsRepository, "finishRental")
      .mockImplementationOnce((): any => {
        return {
          rentalsOutput,
        };
      });

    const rental = await rentalsRepository.finishRental(rentalId);
    expect(rental).toEqual({ rentalsOutput });
  });
});

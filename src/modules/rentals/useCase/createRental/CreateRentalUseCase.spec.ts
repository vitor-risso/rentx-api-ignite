import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepository: RentalRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayPlus24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      dateProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const user_id = "dsadas";
    const car = await carsRepository.create({
      name: "tes",
      description: "description",
      dayli_rate: 100,
      license_plate: "test plate",
      fine_amount: 40,
      category_id: "1234",
      brand: "test brand",
    });
    const expected_return_date = dayPlus24Hours;
    const rental = await createRentalUseCase.execute({
      user_id,
      car_id: car.id,
      expected_return_date,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if user has a rental in progress", async () => {
    const user_id = "dsadas";
    const car = await carsRepository.create({
      name: "tesss",
      description: "descriptione",
      dayli_rate: 100,
      license_plate: "test platess",
      fine_amount: 40,
      category_id: "12we34",
      brand: "test bransd",
    });
    const car2 = await carsRepository.create({
      id:"ddddddd",
      name: "car2",
      description: "description 2",
      dayli_rate: 100,
      license_plate: "test plate 2",
      fine_amount: 40,
      category_id: "123423",
      brand: "test brand3",
    });
    const expected_return_date = dayPlus24Hours;
    await createRentalUseCase.execute({
      user_id,
      car_id: car.id,
      expected_return_date,
    });

    await expect(
       createRentalUseCase.execute({
        user_id,
        car_id: car2.id,
        expected_return_date,
      })
    ).rejects.toEqual(new AppError("User has rental in progress"));
  });

  it("should not be able to create a new rental if the car is with a rental in progress", async () => {
    const user_id = "aaaa";
    const user_id2 = "weqdsadas";
    const car = await carsRepository.create({
      name: "tes",
      description: "description",
      dayli_rate: 100,
      license_plate: "test plate",
      fine_amount: 40,
      category_id: "1234",
      brand: "test brand",
    });
    const expected_return_date = dayPlus24Hours;
    await createRentalUseCase.execute({
      user_id,
      car_id: car.id,
      expected_return_date,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: user_id2,
        car_id: car.id,
        expected_return_date,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with less than 24 hours of rental", async () => {
    const user_id = "dsadas";
    const car_id = "dasdas";
    const expected_return_date = new Date();

    await expect(
       createRentalUseCase.execute({
        user_id,
        car_id,
        expected_return_date,
      })
    ).rejects.toEqual(new AppError("Invalid return time"))
  });
});

import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCaser: CreateCarUseCase;
let repository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCaser = new CreateCarUseCase(repository);
  });

  it("Should be able create a new car", async () => {
    const car = await createCarUseCaser.excute({
      name: "name",
      description: "desc",
      dayli_rate: 45,
      license_plate: "abc",
      fine_amount: 456,
      brand: "ford",
      category_id: "dsa",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able create a new car with the a license plate existent ", async () => {
    await createCarUseCaser.excute({
      name: "car1",
      description: "desc1",
      dayli_rate: 45,
      license_plate: "abca",
      fine_amount: 456,
      brand: "ford",
      category_id: "dsa",
    });

    await expect(
      createCarUseCaser.excute({
        name: "car2",
        description: "desc2",
        dayli_rate: 45,
        license_plate: "abca",
        fine_amount: 456,
        brand: "ford",
        category_id: "dsa",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should be able create a new car with aailable true as defautl", async () => {
    const car = await createCarUseCaser.excute({
      name: "name",
      description: "desc",
      dayli_rate: 45,
      license_plate: "abc",
      fine_amount: 456,
      brand: "ford",
      category_id: "dsa",
    });
    expect(car.available).toBe(true);
  });
});

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from 'dayjs'
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalRepository: RentalRepositoryInMemory
let carsRepository: CarsRepositoryInMemory
let dateProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayPlus24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    carsRepository = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepository, dateProvider, carsRepository)
  })

  it("should be able to create a new rental", async () => {
    const user_id = "dsadas"
    const car_id = "dasdas"
    const expected_return_date = dayPlus24Hours
    const rental = await createRentalUseCase.execute({ user_id, car_id, expected_return_date })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })


  it("should not be able to create a new rental if user has a rental in progress", async () => {
    expect(async () => {
      const user_id = "dsadas"
      const car_id = "dasdas"
      const car_id2 = "dasdasdsad"
      const expected_return_date = dayPlus24Hours
      await createRentalUseCase.execute({ user_id, car_id, expected_return_date })
      await createRentalUseCase.execute({ user_id, car_id: car_id2, expected_return_date })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental if the car is with a rental in progress", async () => {
    expect(async () => {
      const user_id = "dsadas"
      const user_id2 = "weqdsadas"
      const car_id = "dasdas"
      const expected_return_date = dayPlus24Hours
      await createRentalUseCase.execute({ user_id, car_id, expected_return_date })
      await createRentalUseCase.execute({ user_id: user_id2, car_id, expected_return_date })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with less than 24 hours of rental", async () => {
    expect(async () => {
      const user_id = "dsadas"
      const car_id = "dasdas"
      const expected_return_date = new Date()
      await createRentalUseCase.execute({ user_id, car_id, expected_return_date })
    }).rejects.toBeInstanceOf(AppError)
  })
})

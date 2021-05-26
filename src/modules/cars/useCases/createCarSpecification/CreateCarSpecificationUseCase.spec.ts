import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepository: CarsRepositoryInMemory
let specificationRepository: SpecificationInMemory

describe("Create car specification", () => {


  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    specificationRepository = new SpecificationInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationRepository)
  })

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      "name": "Hilux",
      "description": "Caminhonete",
      "dayli_rate": 40,
      "license_plate": "abc-11121",
      "fine_amount": 100,
      "brand": "Toyota",
      "category_id": "287e90ff-aa48-4dc5-86d2-7106a94fc8b5"
    })

    const specification = await specificationRepository.create({ name: "Caminhonete", description: "Tem caçamba" })

    const car_id = car.id
    const specifications_id = [specification.id]
    const specifications = await createCarSpecificationUseCase.execute({ car_id, specifications_id })

    expect(specifications).toHaveProperty("specifications")
    expect(specifications.specifications.length).toBe(1)
    expect(specifications.specifications[0].name).toBe(specification.name)

  })

  it("should not be able to add a new specification to a nonexistent car", async () => {
    expect(async () => {
      const car_id = "123"
      const specifications_id = ["654321"]
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })
})

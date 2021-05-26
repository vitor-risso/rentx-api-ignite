import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let repository: ICarsRepository

describe("Lir cars", () => {

  beforeEach(() => {
    repository = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(repository)
  })

  it('should be able to list all available cars', async () => {
    const car = await repository.create({
      "name": "Fiesta",
      "description": "Carro popular a",
      "dayli_rate": 40,
      "license_plate": "abc-11121",
      "fine_amount": 100,
      "brand": "Ford",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await repository.create({
      "name": "Fiesta",
      "description": "Carro popular a",
      "dayli_rate": 40,
      "license_plate": "abc-11131",
      "fine_amount": 100,
      "brand": "Ford",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })
    await repository.create({
      "name": "Ford KA",
      "description": "Carro popular a",
      "dayli_rate": 40,
      "license_plate": "abc-111121",
      "fine_amount": 100,
      "brand": "Ford",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })

    const cars = await listCarsUseCase.execute({ name: car.name })

    expect(cars).toEqual([car])
  })

  it('should be ableto list all available cars brand', async () => {
    const car = await repository.create({
      "name": "Fiesta",
      "description": "Carro popular",
      "dayli_rate": 40,
      "license_plate": "abc-111221",
      "fine_amount": 100,
      "brand": "Ford",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })

    await repository.create({
      "name": "Hilux",
      "description": "Caminhonete",
      "dayli_rate": 40,
      "license_plate": "abc-11121",
      "fine_amount": 100,
      "brand": "Toyota",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })

    const cars = await listCarsUseCase.execute({ brand: car.brand })

    expect(cars).toEqual([car])
  })


  it('should be ableto list all available cars by category_id', async () => {
    const car = await repository.create({
      "name": "Fiesta",
      "description": "Carro popular",
      "dayli_rate": 40,
      "license_plate": "abc-111221",
      "fine_amount": 100,
      "brand": "Ford",
      "category_id": "02ab5b50-dfde-45ee-bf1a-e599bdcd9193"
    })

    await repository.create({
      "name": "Hilux",
      "description": "Caminhonete",
      "dayli_rate": 40,
      "license_plate": "abc-11121",
      "fine_amount": 100,
      "brand": "Toyota",
      "category_id": "287e90ff-aa48-4dc5-86d2-7106a94fc8b5"
    })

    const cars = await listCarsUseCase.execute({ category_id: car.category_id })

    expect(cars).toEqual([car])
  })

})

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalRepository: RentalRepositoryInMemory

describe("Create Rental", () => {

  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepository)
  })

  it("should be able to create a new rental", async () => {
    const user_id = "dsadas"
    const car_id = "dasdas"
    const expected_return_date = new Date
    await createRentalUseCase.execute({ user_id, car_id , expected_return_date})
  })

})

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;

}

class CreateRentalUseCase {

  constructor(

    private rentalCarRepository: IRentalsRepository
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<void> {

    const carUnavailable = await this.rentalCarRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalCarRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("User has rental in progress")
    }

    

  }

}

export { CreateRentalUseCase }

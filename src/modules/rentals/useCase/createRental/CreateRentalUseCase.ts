import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"



interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalCarRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

    const carUnavailable = await this.rentalCarRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalCarRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("User has rental in progress")
    }

    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compare(dateNow, expected_return_date)


    if (compare < 24) {
      throw new AppError("Invalid return time")
    }

    const rental = await this.rentalCarRepository.create({
      user_id,
      car_id,
      expected_return_date
    })
    return rental
  }

}

export { CreateRentalUseCase }

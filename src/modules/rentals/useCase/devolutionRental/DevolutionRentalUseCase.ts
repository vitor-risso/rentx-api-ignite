import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ id }: IRequest): Promise<Rental> {

    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)


    if (!rental) {
      throw new AppError("Rental does not exists")
    }

    const dateNow = this.dateProvider.dateNow()

    let dayli = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    )

    if (dayli <= 0) {
      dayli = 1
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    )

    let total = 0
    if (delay > 0) {
      total = delay * car.fine_amount
    }

    total += dayli * car.dayli_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental

  }
}

export { DevolutionRentalUseCase };

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { AppError } from "@shared/errors/AppError"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(

    private rentalCarRepository: IRentalsRepository
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

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()
    const dateNow = dayjs().utc().local().format()

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")

    if(compare < 24){
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

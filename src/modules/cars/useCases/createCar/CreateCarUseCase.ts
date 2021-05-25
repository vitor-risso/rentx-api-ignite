import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  dayli_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string
}


// @injectable()
class CreateCarUseCase {

  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async excute({
    name,
    description,
    dayli_rate,
    license_plate,
    fine_amount,
    brand,
    category_id }: IRequest): Promise<Car> {

    const carAlreadyExists = await this.carsRepository.finByLicensePlate(license_plate)

    if (carAlreadyExists) {
      throw new AppError("Car already exists")
    }

    const car = await this.carsRepository.create({
      name,
      description,
      dayli_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    return car

  }

}


export { CreateCarUseCase }

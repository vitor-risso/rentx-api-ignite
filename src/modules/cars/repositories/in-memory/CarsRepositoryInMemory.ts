import { IcreateCartDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { TreeChildren } from "typeorm";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = []

  async create({ brand, category_id, dayli_rate, description, fine_amount, license_plate, name }: IcreateCartDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, {
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    this.cars.push(car)
    return car
  }

  async finByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

}

export { CarsRepositoryInMemory };


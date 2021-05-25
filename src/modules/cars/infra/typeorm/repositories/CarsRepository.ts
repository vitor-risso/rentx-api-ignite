import { IcreateCartDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    category_id,
    dayli_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: IcreateCartDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    await this.repository.save(car)
    return car
  }

  async finByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

}

export { CarsRepository }

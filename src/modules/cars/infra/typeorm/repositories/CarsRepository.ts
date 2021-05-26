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
    name,
    specifications,
    id
  }: IcreateCartDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    })

    await this.repository.save(car)
    return car
  }

  async finByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

  async listAllCarsAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("car.brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("car.name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("car.category_id = :category_id", { category_id })
    }

    return await carsQuery.getMany()
  }

  async findById(car_id: string): Promise<Car> {
    return this.repository.findOne({ where: { id: car_id } })
  }

}

export { CarsRepository }

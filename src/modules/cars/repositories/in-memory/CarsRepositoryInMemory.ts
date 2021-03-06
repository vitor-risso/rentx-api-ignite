import { IcreateCartDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { TreeChildren } from "typeorm";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

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
    const car = new Car()
    Object.assign(car, {
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

    this.cars.push(car)
    return car
  }

  async finByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async listAllCarsAvailable(
    category_id?: string,
    brand?: string,
    name?: string): Promise<Car[]> {
    const all = this.cars
      .filter(car => {
        if ((brand && car.brand === brand) || (category_id && car.category_id === category_id) ||
          (name && car.name === name)) {
          return car;
        } else if (!brand && !name && !category_id) {
          if (car.available) {
            return car
          }
        }
        return null;
      });

    return all
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
   const carIndex = this.cars.findIndex(car => car.id === id)
   this.cars[carIndex].available = available
  }
}

export { CarsRepositoryInMemory };


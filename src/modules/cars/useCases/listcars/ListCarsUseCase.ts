import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

// @injectable()
class ListCarsUseCase {

  constructor(
    // @inject("CarsRepository")
    private repositoru: ICarsRepository
  ) { }

  async execute({ brand=null, category_id=null, name=null }: IRequest): Promise<Car[]> {
    return this.repositoru.listAllCarsAvailable(brand, category_id, name)
  }

}

export { ListCarsUseCase }

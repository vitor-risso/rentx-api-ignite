import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListCarsAvailableUseCase {

  constructor(
    @inject("CarsRepository")
    private repository: ICarsRepository
  ) { }

  async execute({ brand = null, category_id = null, name = null }: IRequest): Promise<Car[]> {
    return this.repository.listAllCarsAvailable(category_id, brand, name)
  }

}

export { ListCarsAvailableUseCase }

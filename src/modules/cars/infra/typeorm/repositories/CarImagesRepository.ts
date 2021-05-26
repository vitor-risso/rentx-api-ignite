import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImages";

class CarImagesRepository implements ICarsImagesRepository {

  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {


    const car_image = await this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(car_image)

    return car_image
  }
}

export { CarImagesRepository };

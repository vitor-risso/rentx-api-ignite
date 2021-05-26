import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  car_id: string;
  images_name: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarsImagesRepository
  ) { }

  async execute({ car_id, images_name }: IRequest) {

    images_name.map(async (image) => {
      await this.carImagesRepository.create(car_id, image)
    })

  }
}

export { UploadCarImageUseCase };


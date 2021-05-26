import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles{
  filename: string
}

class UploadCarImageController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as IFiles[];
    
    const images_name = images.map(image => image.filename)

    const uploadCarImagesUseCaswe = container.resolve(UploadCarImageUseCase)
    await uploadCarImagesUseCaswe.execute({
      car_id: id,
      images_name
    })

    return res.status(201).send()
  }

}

export { UploadCarImageController }

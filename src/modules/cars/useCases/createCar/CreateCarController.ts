import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {

  async hadle(req: Request, res: Response): Promise<Response> {
    const { name,
      description,
      dayli_rate,
      license_plate,
      fine_amount,
      brand,
      category_id } = req.body

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.excute({
      name,
      description,
      dayli_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    return res.status(201).json(car)

  }

}

export { CreateCarController }

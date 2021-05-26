import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsAvailableUseCase } from './ListCarsAvailableUseCase'



class ListCarsAvailableController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, brand, category_id } = req.query;

    const availableCarsUseCase = container.resolve(ListCarsAvailableUseCase)

    const cars = await availableCarsUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string
    })

    return res.json(cars)
  }
}

export { ListCarsAvailableController }

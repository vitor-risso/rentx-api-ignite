import { container } from 'tsyringe'
import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


class CreateSpecificationController {


  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const specificationUseCase = container.resolve(CreateSpecificationUseCase)

    try {
      specificationUseCase.execute({ name, description })
      return res.status(201).send()

    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}

export {
  CreateSpecificationController
}

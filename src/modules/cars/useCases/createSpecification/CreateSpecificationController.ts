import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


class CreateSpecificationController {

  constructor(private specificationUseCase: CreateSpecificationUseCase) { }

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    try {
      this.specificationUseCase.execute({ name, description })
      return res.status(201).send()

    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}

export {
  CreateSpecificationController
}

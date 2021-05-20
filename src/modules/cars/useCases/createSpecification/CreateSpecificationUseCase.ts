import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError';
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


interface IRequest {
  name: string;
  description: string
}

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject("SpecificationsRepository")
    private repository: ISpecificationsRepository) { }

  async execute({ name, description }: IRequest) {
    const specificationAlreadyExists = await this.repository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError("Specifications Already Exists")
    }

    await this.repository.create({ name, description })
  }

}

export { CreateSpecificationUseCase }

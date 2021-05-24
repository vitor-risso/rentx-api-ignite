import { AppError } from '@shared/errors/AppError'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { inject, injectable } from 'tsyringe'



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
      throw new AppError("Specifications Already Exists", 400)
    }

    await this.repository.create({ name, description })
  }

}

export { CreateSpecificationUseCase }

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


interface IRequest {
  name: string;
  description: string
}

class CreateSpecificationUseCase {

  constructor(private repository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists = this.repository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error("Specifications Already Exists")
    }

    this.repository.create({ name, description })
  }

}

export { CreateSpecificationUseCase }

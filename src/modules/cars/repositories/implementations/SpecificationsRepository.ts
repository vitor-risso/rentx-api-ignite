import { Specification } from "@modules/cars/entities/Specification";
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)

  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name })
    return specification
  }
}

export { SpecificationsRepository };


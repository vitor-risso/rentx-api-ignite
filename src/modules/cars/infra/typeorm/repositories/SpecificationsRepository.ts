import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import specificationsRoutes from "@shared/infra/http/routes/Specifications.routes";
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification)
  }


  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)

    return specification

  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name })
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
   const specifications = await this.repository.findByIds(ids)
   return specifications
  }
}

export { SpecificationsRepository };


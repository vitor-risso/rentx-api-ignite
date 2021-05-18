import { getRepository, Repository } from "typeorm";
import Category from "../../entitites/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {

    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return await this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export default CategoriesRepository

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute() {
    const category = await this.categoriesRepository.list();

    return category

  }
}

export { ListCategoriesUseCase }

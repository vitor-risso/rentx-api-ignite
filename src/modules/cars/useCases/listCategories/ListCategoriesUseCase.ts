import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute() {
    const category = this.categoriesRepository.list();

    return category
  
  }
}

export { ListCategoriesUseCase }

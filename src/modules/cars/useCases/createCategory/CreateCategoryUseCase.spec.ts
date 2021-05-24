import { AppError } from "@errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


describe('Create Category', () => {

  let createCategory: CreateCategoryUseCase;
  let categoryRepository: CategoryRepositoryInMemory;

  beforeEach(() => {
    categoryRepository = new CategoryRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoryRepository)
  })

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test ",
      description: "Category description test"
    }

    await createCategory.execute({
      name: category.name,
      description: category.description
    })

    const result = await categoryRepository.findByName(category.name)

    expect(result).toHaveProperty("id")
  })

  it("Should not be able to create a new category with the same name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test ",
        description: "Category description test"
      }

      await createCategory.execute({
        name: category.name,
        description: category.description
      })

      await createCategory.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)

  })

})

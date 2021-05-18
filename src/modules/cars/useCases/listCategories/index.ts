import CategoriesRepository from "../../repositories/implementations/CategoriesRepository"
import { ListCategoriesController } from "./ListaCategoriesController"
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

const repository = null
const useCase = new ListCategoriesUseCase(repository)
const listCategoriesController = new ListCategoriesController(useCase)

export { listCategoriesController }

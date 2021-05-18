import fs from 'fs'
import cvsParse from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string;
  description: string
}

class ImportCategoryUseCase {

  constructor(private categoryRepository: ICategoriesRepository) { }

  looadCategoires(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = cvsParse()

      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
        const [name, description] = line
        categories.push({
          name,
          description
        })
      }).on("end", () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      })
    })
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.looadCategoires(file)

    categories.map(async (category) => {
      const { name, description } = category
      const existsCategory = this.categoryRepository.findByName(name)
      if (!existsCategory) {
        this.categoryRepository.create({
          name, description
        })
      }
    })
  }

}

export { ImportCategoryUseCase }

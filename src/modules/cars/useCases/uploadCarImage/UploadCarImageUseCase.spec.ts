import { UploadCarImageUseCase } from "./UploadCarImageUseCase"

let uploadCarImageUseCase: UploadCarImageUseCase

describe("Add image to car", () => {

  beforeEach(() => {
    uploadCarImageUseCase = new UploadCarImageUseCase()
  })

  it("should be able to add an image to a car", async () => {
    uploadCarImageUseCase.execute({})
  })

})

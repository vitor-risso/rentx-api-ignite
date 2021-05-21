import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file.filename
    const useCase = container.resolve(UpdateUserAvatarUseCase)

    await useCase.execute({ user_id: id, avatar_file: avatarFile })

    return res.status(204).send()
  }

}

export { UpdateUserAvatarController }

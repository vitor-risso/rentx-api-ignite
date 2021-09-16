import { Request, Response } from "express";
import { container } from "tsyringe";
import { TreeParent } from "typeorm";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    let {token} = req.query;
    const { password } = req.body;
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );
    await resetPasswordUserUseCase.execute({ password, token: String(token) });

    return res.send();
  }
}

export { ResetPasswordUserController };

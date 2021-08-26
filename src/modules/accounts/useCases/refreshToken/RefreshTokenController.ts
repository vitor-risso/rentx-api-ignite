import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token;

    const requestTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresToken = await requestTokenUseCase.execute(token);

    return res.json(refresToken)
  }
}

export { RefreshTokenController };

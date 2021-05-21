import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "93f54c8596aec8a37a6ed842ff7f98c6") as IPayload

    const repository = new UsersRepository()
    const user = await repository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exixsts", 401)
    }

    req.user = { id: user_id }
    next()

  } catch (error) {
    throw new AppError(error.message, 401)
  }

}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "93f54c8596aec8a37a6ed842ff7f98c6") as IPayload

    const repository = new UsersRepository()
    const user = await repository.findById(user_id)

    if (!user) {
      throw new Error("User does not exixsts")
    }
    next()

  } catch (error) {
    throw new Error(error.message)
  }

}

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { isNamedExportBindings } from "typescript";


export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

  const { id } = req.user

  const repository = new UsersRepository();
  const user = await repository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("User is not admin")
  }

  next()
}

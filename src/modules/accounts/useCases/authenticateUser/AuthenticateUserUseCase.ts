import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface IRequest {
  email: string;
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(@inject("UsersRepository")
  private usersRepository: IUsersRepository) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.finByEmail(email)

    if (!user) {
      throw new AppError("Email or Password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect")
    }

    const token = sign({}, "93f54c8596aec8a37a6ed842ff7f98c6", {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user: {
        email: user.email,
        name: user.name
      },
      token
    }

  }
}

export { AuthenticateUserUseCase };


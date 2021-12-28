import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepositoyr: IUsersRepository
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError("Invalid token");
    }
    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Expired token");
    }

    const user = await this.usersRepositoyr.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepositoyr.create(user);
    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.finByEmail(email);

    if (!email) {
      throw new AppError("User does not exists");
    }

    const token = v4();
    const expires_date = this.dayjsDateProvider.addDays(3);
    
    await this.usersTokenRepository.create({
      refresh_token: token,
      expires_date,
      user_id: user.id,
    });
  }
}

export { SendForgotPasswordMailUseCase };

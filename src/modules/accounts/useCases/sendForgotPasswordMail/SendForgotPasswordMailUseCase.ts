import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { resolve } from "path";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { EmitFlags } from "typescript";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.finByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = v4();
    const expires_date = this.dayjsDateProvider.addDays(3);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    await this.usersTokenRepository.create({
      refresh_token: token,
      expires_date,
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };

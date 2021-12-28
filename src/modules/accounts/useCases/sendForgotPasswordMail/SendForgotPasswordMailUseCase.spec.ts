import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: IUsersRepository;
let usersTokenRepositoryInMemory: IUsersTokenRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: IMailProvider;

describe("Send forgot email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    const user: ICreateUserDTO = {
      name: "test",
      email: "test@test.com",
      password: "test",
      driver_license: "111111",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password mail to user if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("testss@test1.com")
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokenRepositoryInMemory, "create");

    const user: ICreateUserDTO = {
      name: "test",
      email: "test@test.com",
      password: "test",
      driver_license: "111111",
    };
    await usersRepositoryInMemory.create(user);
    await sendForgotPasswordMailUseCase.execute(user.email);
    expect(generateTokenMail).toBeCalled();
  });
});

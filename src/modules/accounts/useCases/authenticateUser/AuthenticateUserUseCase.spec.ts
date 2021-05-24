import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let repository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {


  beforeEach(() => {
    repository = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(repository)
    createUserUseCase = new CreateUserUseCase(repository)
  })

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00000",
      email: "test@test.com",
      name: "test",
      password: "1234"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("Should not be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "falsepwd"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate an user with a worng password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00000",
        email: "test@test.com",
        name: "test",
        password: "1234"
      }
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "falsepwd"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})

import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}
  async execute({ name, username, password, email, driver_license }: ICreateUserDTO) {
    await this.usersRepository.create({
      name,
      password,
      email,
      driver_license
    })
  }
}

export { CreateUserUseCase }

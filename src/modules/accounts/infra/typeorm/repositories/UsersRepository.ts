import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {
  getRepository,
  Repository
} from "typeorm";


class UsersRepository implements IUsersRepository {

  private repository: Repository<User>
  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, password, email, driver_license, id, avatar } = data
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar
    })

    await this.repository.save(user)
  }

  async finByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email })
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })
    return user
  }

}

export { UsersRepository };


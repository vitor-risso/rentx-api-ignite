import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {

  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User()
    Object.assign(user, {
      ...data
    })

    this.users.push(user)
  }

  async finByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }
}

export { UsersRepositoryInMemory };


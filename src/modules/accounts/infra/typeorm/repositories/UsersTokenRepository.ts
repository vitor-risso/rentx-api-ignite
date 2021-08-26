import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>
  
  constructor(){
    this.repository = getRepository(UserTokens)
  }
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })
    await this.repository.save(userTokens)
    return userTokens
  }
  
}

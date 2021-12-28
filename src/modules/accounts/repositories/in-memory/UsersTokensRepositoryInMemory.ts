import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  userTokens: UserTokens[]= [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  async findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (e) => e.user_id == user_id && e.refresh_token == refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const ut = this.userTokens.find((e) => e.id === id);
    this.userTokens.splice(this.userTokens.indexOf(ut));
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    return this.userTokens.find((e) => e.refresh_token === token);
  }
}

export { UsersTokensRepositoryInMemory };

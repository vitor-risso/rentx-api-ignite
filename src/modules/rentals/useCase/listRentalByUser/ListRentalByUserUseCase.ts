import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser: Rental[] = await this.rentalRepository.findByUser(user_id);
    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase };

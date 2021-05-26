import { IcreateCartDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: IcreateCartDTO): Promise<Car>
  finByLicensePlate(license_plate: string): Promise<Car> | undefined;
  listAllCarsAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> | undefined;
}

export { ICarsRepository }

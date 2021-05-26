import { Specification } from "../infra/typeorm/entities/Specification";

interface IcreateCartDTO {
  name: string;
  description: string;
  dayli_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string,
  specifications?: Specification[],
  id?: string
}


export { IcreateCartDTO }

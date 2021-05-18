import { Router } from 'express';
import { Specification } from '../modules/cars/model/Specification';
import { specificatonController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => specificatonController.handle(req,res))


export default specificationsRoutes

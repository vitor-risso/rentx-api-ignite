import { Router } from 'express';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const specificatonController = new CreateSpecificationController()
specificationsRoutes.post("/", specificatonController.handle)


export default specificationsRoutes

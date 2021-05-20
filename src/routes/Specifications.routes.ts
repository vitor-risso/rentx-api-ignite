import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const specificatonController = new CreateSpecificationController()
specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post("/", specificatonController.handle)


export default specificationsRoutes

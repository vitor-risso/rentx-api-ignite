import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const specificatonController = new CreateSpecificationController()

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, specificatonController.handle)


export default specificationsRoutes

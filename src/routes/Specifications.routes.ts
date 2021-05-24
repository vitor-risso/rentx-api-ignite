import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const specificatonController = new CreateSpecificationController()
specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post("/", specificatonController.handle)


export default specificationsRoutes

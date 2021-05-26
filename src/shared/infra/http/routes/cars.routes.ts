import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/ CreateCarSpecificationController";
import { ListCarsAvailableController } from "@modules/cars/useCases/listCarsAvailable/ListCarsAvailableController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableController = new ListCarsAvailableController()
const createCarSpecificatoinController = new CreateCarSpecificationController()

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
)

carsRoutes.get('/available', listAvailableController.handle)

carsRoutes.post("/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificatoinController.handle)

export { carsRoutes };


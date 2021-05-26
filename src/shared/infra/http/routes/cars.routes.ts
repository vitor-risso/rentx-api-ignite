import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsAvailableController } from "@modules/cars/useCases/listCarsAvailable/ListCarsAvailableController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableController = new ListCarsAvailableController()

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.hadle
)

carsRoutes.get('/available', listAvailableController.handle)

export { carsRoutes };


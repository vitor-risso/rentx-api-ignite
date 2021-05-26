import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsAvailableController } from "@modules/cars/useCases/listCarsAvailable/ListCarsAvailableController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from '../../../../config/upload';
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableController = new ListCarsAvailableController()
const createCarSpecificatoinController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()

const uploadAvatar = multer(uploadConfig.upload("./tmp/cars"))

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

carsRoutes.post('/images/:id',
ensureAuthenticated,
ensureAdmin,
uploadAvatar.array("images"),
uploadCarImagesController.handle)

export { carsRoutes };


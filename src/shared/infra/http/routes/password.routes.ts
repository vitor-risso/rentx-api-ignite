import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendPasswordMailController.handle);

export { passwordRoutes };

import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"

import '../typeorm'
import '../../container'

import { router } from './routes';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((e: Error, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({
      message: e.message
    })
  }

  return res.status(500).json({
    error: "error",
    status: `Internal server error - ${e.message}`
  })
})

app.listen(8080, () => {
  console.log("Server is running on port 8080")
});

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

function trace(req: Request, res: Response, next: NextFunction) {}

function middleware(app: Express) {
  app.use(cors()); /** CORS */
  app.use(express.json());
  return app;
}

export { middleware };

import http from 'http';
import express from 'express';

import { middleware } from './middleware';
import { setupRoutes } from './routes';

let app = express();
app = setupRoutes(middleware(app));

export const server = http.createServer(app);

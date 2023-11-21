import { Express } from 'express';

import { analyticsRouter } from './analytics';

function setupRoutes(app: Express) {
  app.use('/analytics', analyticsRouter);
  return app;
}

export { setupRoutes };

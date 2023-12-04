import { Express } from 'express';

import { analyticsRouter } from './AnalyticsRouter';
import { serviceInfoRouter } from './ServiceInfoRouter';

function setupRoutes(app: Express) {
  app.use('/analytics', analyticsRouter);
  app.use('/_s', serviceInfoRouter);
  return app;
}

export { setupRoutes };

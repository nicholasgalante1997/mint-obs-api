import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/info', (req, res) => {
  res.status(200).json({
    service: {
      name: '@couch-mint/observability-api',
      os: {
        hostname: os.hostname(),
        arch: os.arch(),
        platform: os.platform()
      }
    }
  });
});

export const serviceInfoRouter: Router = router;

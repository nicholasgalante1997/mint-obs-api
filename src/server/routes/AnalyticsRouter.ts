import { Router, Request, Response } from 'express';
import { getAnalyticsController } from '@/controllers/Analytics';
import { validateAnalyticsObject, validateReadOptionObject } from '@/lib';
import { Analytics } from '@/types';

const router = Router();

const controller = getAnalyticsController();

router.post('/create', async (request: Request<{}, Analytics>, response: Response) => {
  const valid = validateAnalyticsObject(request.body);
  if (valid) {
    const { data, error } = await controller.create(request.body as Analytics);
    if (error) {
      response.status(500).json({ data: null, error, status: 'fail' });
    } else {
      response.status(201).json({ data, status: 'ok' });
    }
    return;
  }
  response.status(500).json({ data: null, status: 'fail', error: 'Http:InvalidAnalyticBody' });
  return;
});

router.get('/read', async (request, response) => {
  const valid = validateReadOptionObject(request.body);
  if (valid) {
    const { data, error } = await controller.read(request.body);
    if (error) {
      response.status(500).json({ data: null, error, status: 'fail' });
    } else {
      response.status(201).json({ data, status: 'ok' });
    }
    return;
  }
  response.status(500).json({ data: null, status: 'fail', error: 'Http:InvalidReadOptionBody' });
  return;
});

router.get('/readAll', async (request, response) => {
  const { data, status, error } = await controller.readAll();
  if (error) {
    response.status(500).json({ data: null, error, status: 'fail' });
  } else {
    response.status(201).json({ data, status: 'ok' });
  }
  return;
});

router.delete('/del', async (request, response) => {
  if (validateAnalyticsObject(request.body)) {
    const { data, status, error } = await controller.delete(request.body);
    if (error) {
      response.status(500).json({ data: null, error, status: 'fail' });
    } else {
      response.status(201).json({ data, status: 'ok' });
    }
    return;
  }
  response.status(500).json({ data: null, status: 'fail', error: 'Http:InvalidReadOptionBody' });
  return;
});

export const analyticsRouter: Router = router;

import { Controller } from './Controller';
import { getAnalytics } from '@/models/AnalyticsModel';
import { Analytics } from '@/types/analytics';

class AnalyticsController extends Controller<Analytics, ReturnType<typeof getAnalytics>> {}

let analyticsController: AnalyticsController;

function getAnalyticsController() {
  if (!analyticsController) {
    analyticsController = new AnalyticsController(getAnalytics());
  }
  return analyticsController;
}

export { getAnalyticsController };

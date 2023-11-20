import { IModel, Analytics as AnalyticsType, Option, ReadOptions } from '@/types';

class Analytics implements IModel<AnalyticsType> {
  name = 'Analytics';
  create(dto: AnalyticsType): Option<AnalyticsType> {
    /** datastore implementation */
    return {
      data: dto,
      status: 'ok'
    };
  }
  getOne(ro: ReadOptions): Option<AnalyticsType> {
    /** datastore implementation */
    return {
      data: null,
      status: 'ok'
    };
  }
  getAll(ro?: ReadOptions | undefined): Option<AnalyticsType[]> {
    /** datastore implementation */
    if (ro) {
      /** filter on ro */
    }
    return {
      data: [],
      status: 'ok'
    };
  }
  delete(dto: AnalyticsType): Option<{}> {
    /** datastore implementation */
    return {
      data: null,
      status: 'ok'
    };
  }
}

let analytics: Analytics;

function getAnalytics() {
  if (!analytics) {
    analytics = new Analytics();
  }
  return analytics;
}

export { getAnalytics };

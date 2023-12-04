import { PersistenceModel, getPersistenceModel } from '@/database/PersistenceModel';
import { IModel, Analytics as AnalyticsType, Option, ReadOptions } from '@/types';

class Analytics implements IModel<AnalyticsType> {
  name = 'Analytics';
  database: PersistenceModel = getPersistenceModel('analytics');

  async create(dto: AnalyticsType): Promise<Option<AnalyticsType>> {
    const isValid = this.isValidAnalytic(dto);
    if (!isValid) {
      return {
        data: null,
        error: new Error('InvalidAnalyticDTOSuppliedToCreate'),
        status: 'fail'
      };
    }

    dto = this.cleanAnalyticsObj(dto);

    const { error, status } = await this.database.commit(
      'INSERT INTO analytics(uuid, analytics_event_type, analytics_event_timestamp, analytics_data) VALUES ($1, $2, $3, $4)',
      [dto.id, dto.event.type, dto.event.timestamp, dto.data]
    );

    return {
      data: status === 'ok' && !error ? dto : null,
      error,
      status
    };
  }

  async getOne(ro: ReadOptions): Promise<Option<AnalyticsType | AnalyticsType[]>> {
    const { key, value, multiple } = ro;
    const query = `SELECT * FROM analytics WHERE $1 = $2`;
    const { data, error, status } = await this.database.query(query, [key, value]);
    return {
      data: data ? (multiple ? data.rows : data.rows[0]) : null,
      status,
      error
    };
  }

  async getAll(ro?: ReadOptions | undefined): Promise<Option<AnalyticsType[]>> {
    const query = `SELECT * FROM analytics`;
    const { data, error, status } = await this.database.query(query);
    if (error || status === 'fail') {
      return {
        data: null,
        status: 'fail',
        error: error || 'UnableToQueryDatabaseException'
      };
    }

    let rows = data?.rows ?? [];
    if (ro) {
      const { key, value, multiple } = ro;
      if (multiple) {
        rows = rows.filter((row) => row[key] === value);
      } else {
        rows = [rows.find((row) => row[key] === value)];
      }
    }

    return {
      data: rows,
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

  private isValidAnalytic(obj: any): obj is AnalyticsType {
    const hasEvent = 'event' in obj;
    const hasTimestamp = 'timestamp' in obj.event;
    const hasType = 'type' in obj.event;
    const hasId = 'id' in obj;
    const hasData = 'data' in obj;

    return Boolean(hasEvent && hasTimestamp && hasType && hasId && hasData);
  }

  private cleanAnalyticsObj(obj: any): AnalyticsType {
    const id = obj.id;
    const data = JSON.stringify(obj.data);
    const event = { type: obj?.event?.type, timestamp: obj?.event?.timestamp };
    const sanitized = Object.assign({}, { id, data, event });
    return sanitized;
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

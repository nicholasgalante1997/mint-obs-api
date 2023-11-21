import { optionalAsync } from '@/lib';
import { Pool, PoolClient } from 'pg';

class PersistenceModel implements IPersistenceModel {
  _table: string;
  _configuration: { host: string; port: number; password: string; user: string; database: string };
  _pool: Pool;
  constructor(table: string, configuration: IPersistenceModel['_configuration']) {
    this._table = table;
    this._configuration = configuration;
    this._pool = new Pool(this._configuration);
  }

  private async connect() {
    const { data, error, status } = await optionalAsync<PoolClient>(async () => await this._pool.connect());
    if (error || status === 'failed' || !data) {
      console.error('PersistenceModel: connect() method failed. Please check supplied error output.');
      console.error(error);
      return {
        connected: false,
        client: null
      };
    }

    return {
      connected: true,
      client: data
    };
  }
}

let persistenceModelCache = new Map<string, PersistenceModel>();

const defaultConfig = {
  host: process.env.DB_HOST ?? '',
  user: process.env.DB_USER ?? '',
  database: process.env.DB_NAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '5432')
};

function getPersistenceModel(table: string, config = defaultConfig) {
  let persistenceModel = persistenceModelCache.get(table);
  if (!persistenceModel) {
    persistenceModel = new PersistenceModel(table, config);
    persistenceModelCache.set(table, persistenceModel);
  }
  return persistenceModel;
}

export { getPersistenceModel };

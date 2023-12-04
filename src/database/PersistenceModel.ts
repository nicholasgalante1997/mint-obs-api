import { optionalAsync } from '@/lib';
import { Option } from '@/types';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

class PersistenceModel implements IPersistenceModel {
  static _retryLimit = 50;
  _table: string;
  _configuration: { host: string; port: number; password: string; user: string; database: string };
  _pool: Pool;
  constructor(table: string, configuration: IPersistenceModel['_configuration']) {
    this._table = table;
    this._configuration = configuration;
    this._pool = new Pool(this._configuration);
  }

  public async query<T extends QueryResultRow = any>(
    statement: string,
    variables?: string[]
  ): Promise<Option<QueryResult<T>>> {
    let isConnected = false;
    let client: PoolClient | null = null;
    let current = 1;

    while (current < PersistenceModel._retryLimit && !isConnected) {
      const connectResult = await this.connect();
      isConnected = connectResult.connected;
      client = connectResult.client;
    }

    if (!isConnected || !client) {
      throw new Error('UnableToConnectToPgException');
    }

    return await optionalAsync(async () => await client!.query(statement, variables));
  }

  public async commit(statement: string, variables?: string[]): Promise<Option<{ committed: boolean }>> {
    let isConnected = false;
    let client: PoolClient | null = null;
    let current = 1;

    while (current < PersistenceModel._retryLimit && !isConnected) {
      const connectResult = await this.connect();
      isConnected = connectResult.connected;
      client = connectResult.client;
    }

    if (!isConnected || !client) {
      throw new Error('UnableToConnectToPgException');
    }

    await client.query('BEGIN');
    const { error } = await optionalAsync(async () => await client?.query(statement, variables));
    if (error) {
      console.error('PersistenceModel: commit() method failed. Please check supplied error output.');
      console.error(error);
      await client.query('ROLLBACK');
      client.release();
      return {
        data: null,
        status: 'fail',
        error
      };
    }

    await client.query('COMMIT');
    client.release();
    return {
      data: { committed: true },
      status: 'ok'
    };
  }

  private async connect() {
    const { data, error, status } = await optionalAsync<PoolClient>(async () => await this._pool.connect());
    if (error || status === 'fail' || !data) {
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

export { getPersistenceModel, PersistenceModel };

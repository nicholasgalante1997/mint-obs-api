interface IPersistenceModel {
  _table: string;
  _configuration: {
    host: string;
    port: number;
    password: string;
    user: string;
    database: string;
  };
}

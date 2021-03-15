const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  pool: {
    afterCreate: (conn: any, done: any) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
export = {
  development: {
    ...sharedConfig,
    connection: { filename: "./data/lambda.db3" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/testing.db3" },
  },
};
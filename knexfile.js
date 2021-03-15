"use strict";
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
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
module.exports = {
  development: Object.assign(Object.assign({}, sharedConfig), {
    connection: { filename: "./data/lambda.db3" },
  }),
  testing: Object.assign(Object.assign({}, sharedConfig), {
    connection: { filename: "./data/testing.db3" },
  }),
};
//# sourceMappingURL=knexfile.js.map
